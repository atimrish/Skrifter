package actions

import (
	"api/config"
	"encoding/base64"
	"errors"
	JWT "github.com/golang-jwt/jwt/v5"
	"math/rand"
	"time"
)

var jwtSecret = config.InitConfig().Jwt.Secret

type CustomClaims struct {
	UserId        uint `json:"user_id"`
	TokenIdentity int  `json:"token_identity"`
	RoleId        int `json:"role_id"`
	JWT.RegisteredClaims
}

func MakeJWT(payload CustomClaims) string {
	encodedSecret, err := base64.StdEncoding.DecodeString(jwtSecret)
	IfLogFatal(err)
	token := JWT.NewWithClaims(JWT.SigningMethodHS256, payload)

	t, err := token.SignedString(encodedSecret)
	IfLogFatal(err)

	return t
}

func GetPayloadJWT(tokenString string) (*CustomClaims, error) {

	token, err := JWT.ParseWithClaims(tokenString, &CustomClaims{}, func(t *JWT.Token) (interface{}, error) {
		encodedSecret, err := base64.StdEncoding.DecodeString(jwtSecret)
		return encodedSecret, err
	})

	if errors.Is(err, JWT.ErrTokenExpired) {

		return token.Claims.(*CustomClaims), err
	}

	IfLogFatal(err)

	return token.Claims.(*CustomClaims), nil
}

func RefreshToken(accessToken, refreshToken string) (string, string) {
	accessPayload, _ := GetPayloadJWT(accessToken)
	refreshPayload, _ := GetPayloadJWT(refreshToken)

	if accessPayload.TokenIdentity == refreshPayload.TokenIdentity {

		tokenIdentity := rand.Int()

		expAccess := JWT.NumericDate{
			Time: time.Now().Add(time.Minute * 15),
		}

		payload := CustomClaims{
			UserId:        accessPayload.UserId,
			TokenIdentity: tokenIdentity,
			RoleId:        accessPayload.RoleId,
			RegisteredClaims: JWT.RegisteredClaims{
				ExpiresAt: &expAccess,
			},
		}

		newAccessToken := MakeJWT(payload)

		expRefresh := JWT.NumericDate{
			Time: time.Now().Add(time.Hour * 48),
		}

		payload.ExpiresAt = &expRefresh

		newRefreshToken := MakeJWT(payload)

		return newAccessToken, newRefreshToken
	}

	return "", ""
}

///TODO token expired response func
