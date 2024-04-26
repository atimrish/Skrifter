package Role

import (
	"api/app/actions"
	"api/app/models"
	"encoding/json"
	"log"
	"net/http"
)

func GetRoles(w http.ResponseWriter, r *http.Request) {
	db := actions.GetDb()
	res := db.Find(models.Role{})
	log.Println(res)
}

func AddRole(w http.ResponseWriter, r *http.Request) {
	body := actions.ReadRequestBody(r)

	type AddRoleRequest struct {
		Name string `json:"name"`
	}

	var req AddRoleRequest
	err := json.Unmarshal(body, &req)
	actions.IfLogFatal(err)

	var role = models.Role{
		Name: req.Name,
	}

	db := actions.GetDb()
	db.Create(&role)

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(map[string]string{
		"message": "created",
	})
	actions.IfLogFatal(err)
}
