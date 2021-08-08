package main

import (
	"fmt"
	"id107/model"
)

func main() {
	fmt.Println("hello there")

	var legionData = model.LoadLegionData()

	var legionStuff = fmt.Sprintf( "legion units=%d upgrades=%d", len(legionData.Units), len(legionData.Upgrades))

	fmt.Println("legion unit size: " + legionStuff)

	fmt.Println("luke:", legionData.Units[0])
}
