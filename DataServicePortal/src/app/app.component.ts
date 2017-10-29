import { Component } from '@angular/core';

import { QuerySummaryModel } from './model/query-summary-model';
import { QueryModel } from './model/query-model';

import { QueryDef } from './datasources/query-def';
import { QuerySummaryDef } from './datasources/query-summary-def';
import { QueryDefLoaderService } from './datasources/query-def-loader.service';

@Component
({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   [ './app.component.scss' ]
})
export class AppComponent
{
    public querySummaries: QuerySummaryModel[];
    public selectedQuery:  QueryModel;

    public constructor(private queryDefLoaderService: QueryDefLoaderService)
    {
        this.querySummaries  = [];
        this.selectedQuery   = new QueryModel();

        this.loadQuerySummaryDef();
    }

    private loadQuerySummaryDef(): void
    {
        this.queryDefLoaderService.getQueryDefSummarys()
            .then((queryDefSummarys) => { this.processQueryDefSummarys(queryDefSummarys) })
            .catch(() => { this.processQueryDefSummarys([ ]) } );
    }

    public doQueryChange(): void
    {
        this.queryDefLoaderService.getQueryDef('9999e042-3e08-4dba-9ee9-adcf5e8e9206')
            .then((queryDef) => { this.processQueryDef(queryDef) })
            .catch(() => { this.processQueryDef(null) } );
    }

    private processQueryDefSummarys(querySummaryDefs: QuerySummaryDef[]): void
    {
        this.querySummaries = [];

        for (const querySummaryDef of querySummaryDefs)
        {
            const querySummaryModel = new QuerySummaryModel();

            querySummaryModel.id   = querySummaryDef.id;
            querySummaryModel.name = querySummaryDef.name;

            this.querySummaries.push(querySummaryModel);
        }
    }

    private processQueryDef(queryDef: QueryDef): void
    {
        if (queryDef !== null)
        {
            this.selectedQuery.id    = queryDef.id;
            this.selectedQuery.name  = queryDef.name;
            this.selectedQuery.query = queryDef.query;
        }
        else
        {
            this.selectedQuery.id    = '';
            this.selectedQuery.name  = '';
            this.selectedQuery.query = '';
        }
    }
}
