package route

import (
	"github.com/gofiber/fiber/v2"

	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/config"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/controller"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/repository"
)

func UseRoutes(app *fiber.App, context *config.Context) {
	basePath := app.Group("/all-data-provider")
	useOrganizations(basePath, context)
	useEcosystem(basePath, context)
}

func useOrganizations(basePath fiber.Router, _ *config.Context) {
	organizationController := controller.NewOrganizationController()

	organizations := basePath.Group("/organizations")
	organizations.Get("/", func(c *fiber.Ctx) error {
		return organizationController.GetOrganizations(c)
	})
	organizations.Get("/no_page", func(c *fiber.Ctx) error {
		return organizationController.GetOrganizationsNoPage(c)
	})
	organizations.Get("/:organizationId", func(c *fiber.Ctx) error {
		return organizationController.GetOrganization(c)
	})
	useOrganizationsCharts(organizations)
}

func useOrganizationsCharts(organizations fiber.Router) {
	chartController := controller.NewChartController()

	chartsCountryCounts := organizations.Group("/:organizationId/chartsCountryCounts")
	chartsCountryCounts.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartsCountryCounts(c)
	})
	chartsCountryCountsWithId := chartsCountryCounts.Group("/:chartId")
	chartsCountryCountsWithId.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartCountryCounts(c)
	})
	chartsCountryCountsWithId.Get("/data", func(c *fiber.Ctx) error {
		return chartController.GetChartCountryCountsData(c)
	})

	chartsAlliancesPerGeneration := organizations.Group("/:organizationId/chartsAlliancesPerGeneration")
	chartsAlliancesPerGeneration.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartsAlliancesPerGeneration(c)
	})
	chartsAlliancesPerGenerationWithId := chartsAlliancesPerGeneration.Group("/:chartId")
	chartsAlliancesPerGenerationWithId.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartAlliancesPerGeneration(c)
	})
	chartsAlliancesPerGenerationWithId.Get("/data", func(c *fiber.Ctx) error {
		return chartController.GetChartAlliancesPerGenerationData(c)
	})

	chartsUniversitiesInvolved := organizations.Group("/:organizationId/chartsUniversitiesInvolved")
	chartsUniversitiesInvolved.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartsInvolvedUniversities(c)
	})
	chartsUniversitiesInvolvedWithId := chartsUniversitiesInvolved.Group("/:chartId")
	chartsUniversitiesInvolvedWithId.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartInvolvedUniversities(c)
	})
	chartsUniversitiesInvolvedWithId.Get("/data", func(c *fiber.Ctx) error {
		return chartController.GetChartInvolvedUniversitiesData(c)
	})

	chartsEuropeanAlliances := organizations.Group("/:organizationId/chartsEuropeanAlliances")
	chartsEuropeanAlliances.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartsEuropeanAlliances(c)
	})
	chartsEuropeanAlliancesWithId := chartsEuropeanAlliances.Group("/:chartId")
	chartsEuropeanAlliancesWithId.Get("/", func(c *fiber.Ctx) error {
		return chartController.GetChartEuropeanAlliances(c)
	})
	chartsEuropeanAlliancesWithId.Get("/data", func(c *fiber.Ctx) error {
		return chartController.GetChartEuropeanAlliancesData(c)
	})
}

func useEcosystem(basePath fiber.Router, context *config.Context) {
	issueRepository := context.RepositoriesMap["issues"].(*repository.IssueRepository)
	ecosystemGraphRepository := context.RepositoriesMap["ecosystemGraph"].(*repository.EcosystemGraphRepository)
	cacheRepository := context.RepositoriesMap["cache"].(*repository.CacheRepository)
	issueController := controller.NewIssueController(issueRepository)
	ecosystemGraphController := controller.NewEcosystemGraphController(ecosystemGraphRepository, cacheRepository)

	ecosystem := basePath.Group("/issues")
	ecosystem.Get("/", func(c *fiber.Ctx) error {
		return issueController.GetIssues(c)
	})
	ecosystem.Get("/ecosystem_graph", func(c *fiber.Ctx) error {
		return ecosystemGraphController.GetEcosystemGraph(c)
	})
	ecosystem.Get("/:issueId", func(c *fiber.Ctx) error {
		return issueController.GetIssue(c)
	})
	ecosystem.Post("/", func(c *fiber.Ctx) error {
		return issueController.SaveIssue(c)
	})
	ecosystem.Post("/ecosystem_graph/lock", func(c *fiber.Ctx) error {
		return ecosystemGraphController.RefreshLockEcosystemGraph(c)
	})
	ecosystem.Post("/ecosystem_graph/drop_lock", func(c *fiber.Ctx) error {
		return ecosystemGraphController.DropLockEcosystemGraph(c)
	})
	ecosystem.Post("/:issueId", func(c *fiber.Ctx) error {
		return issueController.UpdateIssue(c)
	})
	ecosystem.Delete("/:issueId", func(c *fiber.Ctx) error {
		return issueController.DeleteIssue(c)
	})
}
