/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2021 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { MainPageState } from '@/pages/Main/MainPageState'
import { ApplicationsPageState } from '@/pages/Applications/ApplicationsPageState'
import { ApplicationsEditPageState } from '@/pages/Applications/ApplicationsEditPageState'
import { ModificatorsPageState } from '@/pages/Modificators/ModificatorsPageState'
import { TemplatesListPageState } from '@/pages/Templates/TemplatesListPageState'
import { TemplatesViewPageState } from '@/pages/Templates/TemplatesViewPageState'
import { TemplateEditPageState } from '@/pages/Templates/TemplateEditPageState'
import { DomainsPageState } from '@/pages/Domains/DomainsPageState'
import { NginxFilesPageState } from '@/pages/NginxFiles/NginxFilesPageState'
import { RoutesPageState } from '@/pages/Routes/RoutesPageState'
import { UsersPageState } from '@/pages/Users/UsersPageState'
import { ServicesPageState } from '@/pages/Services/ServicesPageState'
import { YamlFilesPageState } from '@/pages/YamlFiles/YamlFilesPageState'
import { NotFoundPageState } from '@/pages/NotFound/NotFoundPageState'


export class AppState
{
	title: string = "";
	MainPage: MainPageState = new MainPageState();
	ApplicationsPage: ApplicationsPageState = new ApplicationsPageState();
	ApplicationsEditPage: ApplicationsEditPageState = new ApplicationsEditPageState();
	ModificatorsPage: ModificatorsPageState = new ModificatorsPageState();
	TemplatesListPage: TemplatesListPageState = new TemplatesListPageState();
	TemplatesViewPage: TemplatesViewPageState = new TemplatesViewPageState();
	TemplateEditPage: TemplateEditPageState = new TemplateEditPageState();
	DomainsPage: DomainsPageState = new DomainsPageState();
	NginxFilesPage: NginxFilesPageState = new NginxFilesPageState();
	RoutesPage: RoutesPageState = new RoutesPageState();
	UsersPage: UsersPageState = new UsersPageState();
	YamlFilesPage: YamlFilesPageState = new YamlFilesPageState();
	ServicesPage: ServicesPageState = new ServicesPageState();
	NotFound: NotFoundPageState = new NotFoundPageState();
}
