package repository

import (
	"database/sql"

	sq "github.com/Masterminds/squirrel"
	"github.com/pkg/errors"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/config/db"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/model"
	"github.com/tizianocitro/hood-framework/alliances/all-data-provider/util"
)

type EcosystemGraphRepository struct {
	db           *db.DB
	queryBuilder sq.StatementBuilderType
}

func NewEcosystemGraphRepository(db *db.DB) *EcosystemGraphRepository {
	return &EcosystemGraphRepository{
		db:           db,
		queryBuilder: db.Builder,
	}
}

func (r *EcosystemGraphRepository) GetEcosystemGraph() (*model.EcosystemGraphData, error) {
	nodesSelect := r.queryBuilder.
		Select("*").
		From("CSFDP_Ecosystem_Graph_Nodes")
	var nodes []*model.EcosystemGraphNode
	err := r.db.SelectBuilder(r.db.DB, &nodes, nodesSelect)
	if len(nodes) == 0 {
		return nil, util.ErrNotFound
	} else if err != nil {
		return nil, errors.Wrap(err, "failed to get ecosystem nodes for the section")
	}

	edgesSelect := r.queryBuilder.
		Select("*").
		From("CSFDP_Ecosystem_Graph_Edges")
	var edges []*model.EcosystemGraphEdge
	err = r.db.SelectBuilder(r.db.DB, &edges, edgesSelect)
	if err == sql.ErrNoRows {
		return nil, errors.Wrap(util.ErrNotFound, "no ecosystem edge found for the section")
	} else if err != nil {
		return nil, errors.Wrap(err, "failed to get ecosystem edges for the section")
	}

	return &model.EcosystemGraphData{Nodes: nodes, Edges: edges}, nil
}

func (r *EcosystemGraphRepository) SaveEcosystemGraph(nodes []*model.EcosystemGraphNode, edges []*model.EcosystemGraphEdge) error {
	tx, err := r.db.DB.Beginx()
	if err != nil {
		return errors.Wrap(err, "could not begin transaction")
	}
	defer r.db.FinalizeTransaction(tx)

	// a MERGE statement might be better here but it doesn't work with passed parameters apparently?
	if _, err := r.db.ExecBuilder(tx, sq.Delete("CSFDP_Ecosystem_Graph_Edges")); err != nil {
		return errors.Wrap(err, "couldn't truncate CSFDP_Ecosystem_Graph_Nodes")
	}
	if _, err := r.db.ExecBuilder(tx, sq.Delete("CSFDP_Ecosystem_Graph_Nodes")); err != nil {
		return errors.Wrap(err, "couldn't truncate CSFDP_Ecosystem_Graph_Nodes")
	}

	sql := sq.
		Insert("CSFDP_Ecosystem_Graph_Nodes")
	for _, node := range nodes {
		sql = sql.Values(node.ID, node.Name, node.Description, node.Type)
	}
	if _, err := r.db.ExecBuilder(tx, sql); err != nil {
		return errors.Wrap(err, "couldn't update CSFDP_Ecosystem_Graph_Nodes")
	}

	if len(edges) > 0 {
		sql = sq.
			Insert("CSFDP_Ecosystem_Graph_Edges")
		for _, edge := range edges {
			sql = sql.Values(edge.ID, edge.SourceNodeID, edge.DestinationNodeID, edge.Kind)
		}
		if _, err := r.db.ExecBuilder(tx, sql); err != nil {
			return errors.Wrap(err, "couldn't update CSFDP_Ecosystem_Graph_Edges")
		}
	}

	if err := tx.Commit(); err != nil {
		return errors.Wrap(err, "could not commit transaction")
	}

	return nil
}
