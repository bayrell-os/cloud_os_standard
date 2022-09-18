/*!
 *  Bayrell Cloud OS
 *
 *  (c) Copyright 2020 - 2022 "Ildar Bikmamatov" <support@bayrell.org>
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
import { ApplicationSavePageState } from '@/pages/Applications/ApplicationSavePageState'
import { ModificatorsPageState } from '@/pages/Modificators/ModificatorsPageState'
import { TemplatesListPageState } from '@/pages/Templates/TemplatesListPageState'
import { TemplatesVersionsPageState } from '@/pages/Templates/TemplatesVersionsPageState'
import { TemplateSavePageState } from '@/pages/Templates/TemplateSavePageState'
import { DomainsPageState } from '@/pages/Domains/DomainsPageState'
import { DomainsSSLGroupPageState } from '@/pages/DomainsSSLGroup/DomainsSSLGroupPageState'
import { NginxFilesPageState } from '@/pages/NginxFiles/NginxFilesPageState'
import { RoutesPageState } from '@/pages/Routes/RoutesPageState'
import { ServicesPageState } from '@/pages/Services/ServicesPageState'
import { UsersPageState } from '@/pages/Users/UsersPageState'
import { YamlFilesPageState } from '@/pages/YamlFiles/YamlFilesPageState'
import { NotFoundPageState } from '@/pages/NotFound/NotFoundPageState'
import { SpacesPageState } from './pages/Spaces/SpacesPageState'
import { StacksPageState } from './pages/Stacks/StacksPageState'


export class StoreApp
{
	title: string = "";
	app_version: string = "0.4.3-1";
	MainPage: MainPageState = new MainPageState();
	ApplicationSavePage: ApplicationSavePageState = new ApplicationSavePageState();
	ApplicationsListPage: ApplicationsPageState = new ApplicationsPageState();
	ModificatorsPage: ModificatorsPageState = new ModificatorsPageState();
	TemplatesListPage: TemplatesListPageState = new TemplatesListPageState();
	TemplatesVersionsPage: TemplatesVersionsPageState = new TemplatesVersionsPageState();
	TemplateSavePage: TemplateSavePageState = new TemplateSavePageState();
	DomainsPage: DomainsPageState = new DomainsPageState();
	DomainsSSLGroupPage: DomainsSSLGroupPageState = new DomainsSSLGroupPageState();
	NginxFilesPage: NginxFilesPageState = new NginxFilesPageState();
	RoutesPage: RoutesPageState = new RoutesPageState();
	UsersPage: UsersPageState = new UsersPageState();
	YamlFilesPage: YamlFilesPageState = new YamlFilesPageState();
	YamlFileSavePage: YamlFilesPageState = new YamlFilesPageState();
	ServicesPage: ServicesPageState = new ServicesPageState();
	SpaceListPage: SpacesPageState = new SpacesPageState();
	SpaceSavePage: SpacesPageState = new SpacesPageState();
	StacksPage: StacksPageState = new StacksPageState();
	NotFound: NotFoundPageState = new NotFoundPageState();
}
