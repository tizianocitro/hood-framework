package model

import "strconv"

type SimpleLineChartEuropeanAlliancesData struct {
	LineData  []SimpleLineChartEuropeanAlliancesValue `json:"lineData"`
	LineColor LineColor                               `json:"lineColor"`
}

type SimpleLineChartEuropeanAlliancesValue struct {
	Label   string `json:"label"`
	Italy   int    `json:"italy"`
	France  int    `json:"france"`
	Cyprus  int    `json:"cyprus"`
	Poland  int    `json:"poland"`
	Ukraine int    `json:"ukraine"`
}

type LineColor struct {
	Italy   string `json:"italy"`
	France  string `json:"france"`
	Cyprus  string `json:"cyprus"`
	Poland  string `json:"poland"`
	Ukraine string `json:"ukraine"`
}

type ReferenceLine struct {
	X      string `json:"x"`
	Stroke string `json:"stroke"`
	Label  string `json:"label"`
}

type SimpleBarChartCountryCountsData struct {
	BarData  []SimpleBarChartCountryCountsValue `json:"barData"`
	BarColor BarColor                           `json:"barColor"`
}

type SimpleBarChartCountryCountsValue struct {
	Label       string `json:"label"`
	Occurrences int    `json:"occorrenze"`
}

type SimpleBarChartAlliancesPerGenerationData struct {
	BarData  []SimpleBarChartAlliancesPerGenerationValue `json:"barData"`
	BarColor BarColor                                    `json:"barColor"`
}

type SimpleBarChartAlliancesPerGenerationValue struct {
	Label       string `json:"label"`
	Generation1 int    `json:"1"`
	Generation2 int    `json:"2"`
	Generation3 int    `json:"3"`
	Generation4 int    `json:"4"`
}

type SimpleBarChartInvolvedUniversitiesData struct {
	BarData  []SimpleBarChartInvolvedUniversitiesValue `json:"barData"`
	BarColor BarColor                                  `json:"barColor"`
}

type SimpleBarChartInvolvedUniversitiesValue struct {
	Label                string `json:"label"`
	NumberOfUniversities int    `json:"numeroUniversitaCoinvolte"`
}

type BarColor struct {
	Occurrences          string `json:"occorrenze"`
	Generation1          string `json:"1"`
	Generation2          string `json:"2"`
	Generation3          string `json:"3"`
	Generation4          string `json:"4"`
	NumberOfUniversities string `json:"numeroUniversitaCoinvolte"`
}

// BarByLabel implements sort.Interface for []SimpleBarChartAlliancesPerGenerationValue based on the Label field.
type BarByLabel []SimpleBarChartAlliancesPerGenerationValue

func (a BarByLabel) Len() int {
	return len(a)
}

func (a BarByLabel) Swap(i, j int) {
	a[i], a[j] = a[j], a[i]
}

func (a BarByLabel) Less(i, j int) bool {
	labelI, errI := strconv.Atoi(a[i].Label)
	labelJ, errJ := strconv.Atoi(a[j].Label)
	if errI != nil || errJ != nil {
		return a[i].Label < a[j].Label
	}
	return labelI < labelJ
}
