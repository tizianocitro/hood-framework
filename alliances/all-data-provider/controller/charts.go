package controller

import (
	"bytes"
	"encoding/csv"
	"log"
	"sort"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/data"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/model"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/util"
)

// ChartController is a struct to manage charts
type ChartController struct{}

func NewChartController() *ChartController {
	return &ChartController{}
}

func (cc *ChartController) GetChartsCountryCounts(c *fiber.Ctx) error {
	organizationId := c.Params("organizationId")
	tableData := model.PaginatedTableData{
		Columns: chartsPaginatedTableData.Columns,
		Rows:    []model.PaginatedTableRow{},
	}
	for _, chart := range chartsCountryCountsMap[organizationId] {
		tableData.Rows = append(tableData.Rows, model.PaginatedTableRow(chart))
	}
	return c.JSON(tableData)
}

func (cc *ChartController) GetChartCountryCounts(c *fiber.Ctx) error {
	return c.JSON(cc.getChartCountryCountsByID(c))
}

func (cc *ChartController) GetChartCountryCountsData(c *fiber.Ctx) error {
	chartData := model.SimpleBarChartCountryCountsData{
		BarData: []model.SimpleBarChartCountryCountsValue{},
		BarColor: model.BarColor{
			Occurrences: "#6495ED",
		},
	}

	filePath, err := util.GetEmbeddedFilePath("UniversitiesOFAlliancesCountryCounts", "*.csv")
	if err != nil {
		log.Printf("Failed GetEmbeddedFilePath with error: %v", err)
		return c.JSON(chartData)
	}
	content, err := data.Data.ReadFile(filePath)
	if err != nil {
		log.Printf("Failed ReadFile with error: %v", err)
		return c.JSON(chartData)
	}
	bytesReader := bytes.NewReader(content)
	reader := csv.NewReader(bytesReader)

	rows, err := reader.ReadAll()
	if err != nil {
		log.Printf("Failed ReadAll with error: %v", err)
		return c.JSON(chartData)
	}

	bars := []model.SimpleBarChartCountryCountsValue{}
	for i, row := range rows {
		if i == 0 {
			continue
		}
		country := row[0]
		occurrences, err := strconv.Atoi(row[1])
		if err != nil {
			log.Printf("Skipped row %d because failed Atoi of occurrences with error: %v", i, err)
			continue
		}
		bars = append(bars, model.SimpleBarChartCountryCountsValue{
			Label:       country,
			Occurrences: occurrences,
		})
	}

	chartData.BarData = bars
	return c.JSON(chartData)
}

func (cc *ChartController) getChartCountryCountsByID(c *fiber.Ctx) model.Chart {
	organizationId := c.Params("organizationId")
	chartId := c.Params("chartId")
	for _, chart := range chartsCountryCountsMap[organizationId] {
		if chart.ID == chartId {
			return chart
		}
	}
	return model.Chart{}
}

func (cc *ChartController) GetChartsAlliancesPerGeneration(c *fiber.Ctx) error {
	organizationId := c.Params("organizationId")
	tableData := model.PaginatedTableData{
		Columns: chartsPaginatedTableData.Columns,
		Rows:    []model.PaginatedTableRow{},
	}
	for _, chart := range chartsAlliancesPerGenerationMap[organizationId] {
		tableData.Rows = append(tableData.Rows, model.PaginatedTableRow(chart))
	}
	return c.JSON(tableData)
}

func (cc *ChartController) GetChartAlliancesPerGeneration(c *fiber.Ctx) error {
	return c.JSON(cc.getChartAlliancesPerGenerationByID(c))
}

func (cc *ChartController) GetChartAlliancesPerGenerationData(c *fiber.Ctx) error {
	chartData := model.SimpleBarChartAlliancesPerGenerationData{
		BarData: []model.SimpleBarChartAlliancesPerGenerationValue{},
		BarColor: model.BarColor{
			Generation1: "pink",
			Generation2: "green",
			Generation3: "black",
			Generation4: "#6495ED",
		},
	}

	filePath, err := util.GetEmbeddedFilePath("UniversitiesOFAlliancesAlliancesPerGeneration", "*.csv")
	if err != nil {
		log.Printf("Failed GetEmbeddedFilePath with error: %v", err)
		return c.JSON(chartData)
	}
	content, err := data.Data.ReadFile(filePath)
	if err != nil {
		log.Printf("Failed ReadFile with error: %v", err)
		return c.JSON(chartData)
	}
	bytesReader := bytes.NewReader(content)
	reader := csv.NewReader(bytesReader)

	rows, err := reader.ReadAll()
	if err != nil {
		log.Printf("Failed ReadAll with error: %v", err)
		return c.JSON(chartData)
	}

	barsMap := make(map[string]model.SimpleBarChartAlliancesPerGenerationValue)
	for i, row := range rows {
		if i == 0 {
			continue
		}
		country := row[0]
		generation := row[1]
		count, err := strconv.Atoi(row[2])
		if err != nil {
			log.Printf("Skipped row %d because failed Atoi of count with error: %v", i, err)
			continue
		}
		bar, ok := barsMap[country]
		if !ok {
			bar = model.SimpleBarChartAlliancesPerGenerationValue{
				Label: country,
			}
		}
		if generation == "1" {
			bar.Generation1 = count
		}
		if generation == "2" {
			bar.Generation2 = count
		}
		if generation == "3" {
			bar.Generation3 = count
		}
		if generation == "4" {
			bar.Generation4 = count
		}
		barsMap[country] = bar
	}

	bars := []model.SimpleBarChartAlliancesPerGenerationValue{}
	for _, bar := range barsMap {
		bars = append(bars, bar)
	}

	sort.Sort(model.BarByLabel(bars))
	chartData.BarData = bars
	return c.JSON(chartData)
}

func (cc *ChartController) getChartAlliancesPerGenerationByID(c *fiber.Ctx) model.Chart {
	organizationId := c.Params("organizationId")
	chartId := c.Params("chartId")
	for _, chart := range chartsAlliancesPerGenerationMap[organizationId] {
		if chart.ID == chartId {
			return chart
		}
	}
	return model.Chart{}
}

func (cc *ChartController) GetChartsInvolvedUniversities(c *fiber.Ctx) error {
	organizationId := c.Params("organizationId")
	tableData := model.PaginatedTableData{
		Columns: chartsPaginatedTableData.Columns,
		Rows:    []model.PaginatedTableRow{},
	}
	for _, chart := range chartsInvolvedUniversitiesMap[organizationId] {
		tableData.Rows = append(tableData.Rows, model.PaginatedTableRow(chart))
	}
	return c.JSON(tableData)
}

func (cc *ChartController) GetChartInvolvedUniversities(c *fiber.Ctx) error {
	return c.JSON(cc.getChartInvolvedUniversitiesByID(c))
}

func (cc *ChartController) GetChartInvolvedUniversitiesData(c *fiber.Ctx) error {
	chartData := model.SimpleBarChartInvolvedUniversitiesData{
		BarData: []model.SimpleBarChartInvolvedUniversitiesValue{},
		BarColor: model.BarColor{
			NumberOfUniversities: "red",
		},
	}

	filePath, err := util.GetEmbeddedFilePath("AlliancesWithInvolvedUniversities", "*.csv")
	if err != nil {
		log.Printf("Failed GetEmbeddedFilePath with error: %v", err)
		return c.JSON(chartData)
	}
	content, err := data.Data.ReadFile(filePath)
	if err != nil {
		log.Printf("Failed ReadFile with error: %v", err)
		return c.JSON(chartData)
	}
	bytesReader := bytes.NewReader(content)
	reader := csv.NewReader(bytesReader)

	rows, err := reader.ReadAll()
	if err != nil {
		log.Printf("Failed ReadAll with error: %v", err)
		return c.JSON(chartData)
	}

	bars := []model.SimpleBarChartInvolvedUniversitiesValue{}
	for i, row := range rows {
		if i == 0 {
			continue
		}
		c := row[0]
		d, err := strconv.Atoi(row[1])
		if err != nil {
			log.Printf("Skipped row %d because failed Atoi of d with error: %v", i, err)
			continue
		}
		bars = append(bars, model.SimpleBarChartInvolvedUniversitiesValue{
			Label:                c,
			NumberOfUniversities: d,
		})
	}
	sort.SliceStable(bars, func(i, j int) bool {
		iLabel, err := strconv.Atoi(bars[i].Label)
		if err != nil {
			return false
		}
		jLabel, err := strconv.Atoi(bars[j].Label)
		if err != nil {
			return false
		}
		return iLabel < jLabel
	})
	chartData.BarData = bars
	return c.JSON(chartData)
}

func (cc *ChartController) getChartInvolvedUniversitiesByID(c *fiber.Ctx) model.Chart {
	organizationId := c.Params("organizationId")
	chartId := c.Params("chartId")
	for _, chart := range chartsInvolvedUniversitiesMap[organizationId] {
		if chart.ID == chartId {
			return chart
		}
	}
	return model.Chart{}
}

func (cc *ChartController) GetChartsEuropeanAlliances(c *fiber.Ctx) error {
	organizationId := c.Params("organizationId")
	tableData := model.PaginatedTableData{
		Columns: chartsPaginatedTableData.Columns,
		Rows:    []model.PaginatedTableRow{},
	}
	for _, chart := range chartsEuropeanAlliancesMap[organizationId] {
		tableData.Rows = append(tableData.Rows, model.PaginatedTableRow(chart))
	}
	return c.JSON(tableData)
}

func (cc *ChartController) GetChartEuropeanAlliances(c *fiber.Ctx) error {
	return c.JSON(cc.getChartEuropeanAlliancesByID(c))
}

func (cc *ChartController) GetChartEuropeanAlliancesData(c *fiber.Ctx) error {
	chartData := model.SimpleLineChartEuropeanAlliancesData{
		LineData: []model.SimpleLineChartEuropeanAlliancesValue{},
		LineColor: model.LineColor{
			Italy:   "blue",
			France:  "pink",
			Ukraine: "red",
			Cyprus:  "#6495ED",
			Poland:  "black",
		},
	}

	filePath, err := util.GetEmbeddedFilePath("EuropeanAlliances", "*.csv")
	if err != nil {
		log.Printf("Failed GetEmbeddedFilePath with error: %v", err)
		return c.JSON(chartData)
	}
	content, err := data.Data.ReadFile(filePath)
	if err != nil {
		log.Printf("Failed ReadFile with error: %v", err)
		return c.JSON(chartData)
	}
	bytesReader := bytes.NewReader(content)
	reader := csv.NewReader(bytesReader)

	rows, err := reader.ReadAll()
	if err != nil {
		log.Printf("Failed ReadAll with error: %v", err)
		return c.JSON(chartData)
	}

	linesMap := make(map[string]model.SimpleLineChartEuropeanAlliancesValue)
	for i, row := range rows {
		if i == 0 {
			continue
		}
		country := row[0]
		generation := row[1]
		count, err := strconv.Atoi(row[2])
		if err != nil {
			log.Printf("Skipped row %d because failed Atoi of count with error: %v", i, err)
			continue
		}
		line, ok := linesMap[generation]
		if !ok {
			line = model.SimpleLineChartEuropeanAlliancesValue{
				Label: generation,
			}
		}
		if country == "Italy" {
			line.Italy = count
		}
		if country == "France" {
			line.France = count
		}
		if country == "Ukraine" {
			line.Ukraine = count
		}
		if country == "Cyprus" {
			line.Cyprus = count
		}
		if country == "Poland" {
			line.Poland = count
		}
		linesMap[generation] = line
	}

	lines := []model.SimpleLineChartEuropeanAlliancesValue{}
	for _, bar := range linesMap {
		lines = append(lines, bar)
	}

	sort.SliceStable(lines, func(i, j int) bool {
		iLabel, err := strconv.Atoi(lines[i].Label)
		if err != nil {
			return false
		}
		jLabel, err := strconv.Atoi(lines[j].Label)
		if err != nil {
			return false
		}
		return iLabel < jLabel
	})

	chartData.LineData = lines
	return c.JSON(chartData)
}

func (cc *ChartController) getChartEuropeanAlliancesByID(c *fiber.Ctx) model.Chart {
	organizationId := c.Params("organizationId")
	chartId := c.Params("chartId")
	for _, chart := range chartsEuropeanAlliancesMap[organizationId] {
		if chart.ID == chartId {
			return chart
		}
	}
	return model.Chart{}
}

var chartsCountryCountsMap = map[string][]model.Chart{
	"9": {
		{
			ID:          "7c2155c5-deb7-463f-b1ec-a7f718a29a3e",
			Name:        "Alleanze stipulate per Paese",
			Description: "Alleanze stipulate per Paese.",
		},
	},
	"10": {
		{
			ID:          "434d814f-9f30-4799-bb57-bc51c906b1b6",
			Name:        "Alleanze stipulate per Paese",
			Description: "Alleanze stipulate per Paese.",
		},
	},
	"11": {
		{
			ID:          "6efba994-9f16-4897-aa32-102e7b58c45d",
			Name:        "Alleanze stipulate per Paese",
			Description: "Alleanze stipulate per Paese.",
		},
	},
	"12": {
		{
			ID:          "73c0addc-36ab-4293-aad9-7c55de08e29a",
			Name:        "Alleanze stipulate per Paese",
			Description: "Alleanze stipulate per Paese.",
		},
	},
	"13": {
		{
			ID:          "d4c815bb-e11f-4ca4-b809-b92e3edeb8e0",
			Name:        "Alleanze stipulate per Paese",
			Description: "Alleanze stipulate per Paese.",
		},
	},
}

var chartsAlliancesPerGenerationMap = map[string][]model.Chart{
	"9": {
		{
			ID:          "05f53657-5fec-446f-b0b8-2a3fade8bcaf",
			Name:        "Paesi con numero di Alleanze stipulate per ogni Generazione",
			Description: "Paesi con numero di Alleanze stipulate per ogni Generazione.",
		},
	},
	"10": {
		{
			ID:          "6707f15d-7af2-45af-9f84-d381c0ad2971",
			Name:        "Paesi con numero di Alleanze stipulate per ogni Generazione",
			Description: "Paesi con numero di Alleanze stipulate per ogni Generazione.",
		},
	},
	"11": {
		{
			ID:          "b1702a07-c125-469c-95fe-a0b6911921d3",
			Name:        "Paesi con numero di Alleanze stipulate per ogni Generazione",
			Description: "Paesi con numero di Alleanze stipulate per ogni Generazione.",
		},
	},
	"12": {
		{
			ID:          "29d3b3d3-32ae-44ab-a5cf-0a8d37b8b879",
			Name:        "Paesi con numero di Alleanze stipulate per ogni Generazione",
			Description: "Paesi con numero di Alleanze stipulate per ogni Generazione.",
		},
	},
	"13": {
		{
			ID:          "e4dda46d-7bf4-451e-a227-891d1b0986b1",
			Name:        "Paesi con numero di Alleanze stipulate per ogni Generazione",
			Description: "Paesi con numero di Alleanze stipulate per ogni Generazione.",
		},
	},
}

var chartsInvolvedUniversitiesMap = map[string][]model.Chart{
	"9": {
		{
			ID:          "535d6cbe-2176-4000-b7d9-81b982e18963",
			Name:        "Numero di Università coinvolte per numero di Alleanze",
			Description: "Numero di Università coinvolte per numero di Alleanze.",
		},
	},
	"10": {
		{
			ID:          "cac45858-0d52-496c-b101-d02f40b2d0d7",
			Name:        "Numero di Università coinvolte per numero di Alleanze",
			Description: "Numero di Università coinvolte per numero di Alleanze.",
		},
	},
	"11": {
		{
			ID:          "61051955-a74d-4034-a12d-96697627f2c7",
			Name:        "Numero di Università coinvolte per numero di Alleanze",
			Description: "Numero di Università coinvolte per numero di Alleanze.",
		},
	},
	"12": {
		{
			ID:          "f0c5cd5c-2134-40ce-b3e6-60f4f8a80a02",
			Name:        "Numero di Università coinvolte per numero di Alleanze",
			Description: "Numero di Università coinvolte per numero di Alleanze.",
		},
	},
	"13": {
		{
			ID:          "204b4caf-03f0-4157-a1dc-e61c4a841c5e",
			Name:        "Numero di Università coinvolte per numero di Alleanze",
			Description: "Numero di Università coinvolte per numero di Alleanze.",
		},
	},
}

var chartsEuropeanAlliancesMap = map[string][]model.Chart{
	"9": {
		{
			ID:          "0dbc23ae-b6a0-4769-a35b-a438cddf90b2",
			Name:        "Numero di Alleanze Europee",
			Description: "Numero di Alleanze Europee.",
		},
	},
	"10": {
		{
			ID:          "a32e0537-f656-4eff-9f52-357834fefbc8",
			Name:        "Numero di Alleanze Europee",
			Description: "Numero di Alleanze Europee.",
		},
	},
	"11": {
		{
			ID:          "12a6fa10-6e51-43a3-baac-81a49958e103",
			Name:        "Numero di Alleanze Europee",
			Description: "Numero di Alleanze Europee.",
		},
	},
	"12": {
		{
			ID:          "6bf933f8-867a-4f93-a99f-d0beaadd3bc3",
			Name:        "Numero di Alleanze Europee",
			Description: "Numero di Alleanze Europee.",
		},
	},
	"13": {
		{
			ID:          "902f2923-51db-441a-a67d-e927a884336a",
			Name:        "Numero di Alleanze Europee",
			Description: "Numero di Alleanze Europee.",
		},
	},
}

var chartsPaginatedTableData = model.PaginatedTableData{
	Columns: []model.PaginatedTableColumn{
		{
			Title: "Name",
		},
		{
			Title: "Description",
		},
	},
	Rows: []model.PaginatedTableRow{},
}
