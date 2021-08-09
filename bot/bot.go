package bot

import (
	"flag"
	"fmt"
	dis "github.com/bwmarrin/discordgo"
	"log"
)

var token string
var sess *dis.Session

func init() {
	flag.StringVar(&token, "t", "", "Bot Token")
	flag.Parse()

	if token == "" {
		fmt.Println("No token provided. Please run: id107 -t <bot token>")
		return
	}

	s, err := dis.New("Bot " + token)
	check(err)
	sess = s
}

func PrintBot() {
	log.Println("session iniated %#v", sess)

}

func check(err error) {
	if err != nil {
		log.Fatalf("Invalid bot parameters: %v", err)
	}
}
