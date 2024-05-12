FROM alpine:3.19

ENV NO_PROXY=true
EXPOSE 8080
WORKDIR /srv

RUN ls -la
RUN apk add --no-cache go poppler-utils wv unrtf tidyhtml

CMD ["go", "mod", "download"]
CMD ["go", "run", "main.go", "--action=migrate"]
CMD ["go", "run", "main.go", "--action=serve"]

