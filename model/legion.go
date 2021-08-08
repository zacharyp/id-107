package model

//type Dice struct {
//	Black int `json:"black"`
//	Red   int `json:"red"`
//	White int `json:"white"`
//}

//type Range struct {
//	From int `json:"from"`
//	To   int `json:"to"`
//}

//type Weapon struct {
//	Name     string   `json:"name"`
//	Range    Range    `json:"range,omitempty"`
//	Dice     Dice     `json:"dice,omitempty"`
//	Keywords []string `json:"keywords"`
//}

type Surge struct {
	Attack string `json:"attack"`
}

type Unit struct {
	Ldf          string   `json:"ldf"`
	Unique       bool     `json:"unique"`
	Name         string   `json:"name"`
	Subtitle     string   `json:"subtitle"`
	Factions     []string `json:"factions"`
	Type         string   `json:"type"`
	Points       int      `json:"points"`
	Rank         string   `json:"rank"`
	Minis        int      `json:"minis"`
	Wounds       int      `json:"wounds"`
	Courage      int      `json:"courage"`
	Defense      string   `json:"defense"`
	Surge        Surge
	Speed        int      `json:"speed"`
	Slots        []string `json:"slots"`
	Keywords     []string `json:"keywords"`
	//Weapons      []Weapon `json:"weapons"`
	CommandCards []string `json:"commandCards"`
}

type Restriction struct {
	Name string `json:"name"`
	Ldf  string `json:"ldf"`
}

type Upgrade struct {
	Ldf                 string   `json:"ldf"`
	Name                string   `json:"name"`
	Unique              bool     `json:"unique"`
	Description         string   `json:"description"`
	Slot                string   `json:"slot"`
	Points              int      `json:"points"`
	Keywords            []string `json:"keywords"`
	//Weapon              Weapon   `json:"weapon"`
}

type LegionData struct {
	Units    []Unit    `json:"units"`
	Upgrades []Upgrade `json:"upgrades"`
}
