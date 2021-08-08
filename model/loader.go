package model

import "io/ioutil"
import "encoding/json"

func LoadLegionData() LegionData {
	dat, err := ioutil.ReadFile("legion-data.json")
	check(err)

	var legionData LegionData

	err = json.Unmarshal(dat, &legionData)

	check(err)

	return legionData
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
