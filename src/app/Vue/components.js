/* Import components */
import CrudList from 'vue-helper/Crud/CrudList.vue';
import CrudSave from 'vue-helper/Crud/CrudSave.vue';
import CrudResult from 'vue-helper/Crud/CrudResult.vue';
import Dialog from 'vue-helper/Crud/Dialog.vue';
import Form from 'vue-helper/Crud/Form.vue';
import Button from 'vue-helper/Crud/Button.vue';
import Input from 'vue-helper/Crud/Input.vue';
import Label from 'vue-helper/Crud/Label.vue';
import Pagination from 'vue-helper/Crud/Pagination.vue';
import RowButtons from 'vue-helper/Crud/RowButtons.vue';
import RowNumber from 'vue-helper/Crud/RowNumber.vue';
import Select from 'vue-helper/Crud/Select.vue';
import SelectLabel from 'vue-helper/Crud/SelectLabel.vue';
import TextArea from 'vue-helper/Crud/TextArea.vue';
import CodeMirror from 'vue-helper/Crud/CodeMirror.vue';
import Tabs from 'vue-helper/Crud/Tabs.vue';
import Tab from 'vue-helper/Crud/Tab.vue';

/* App components */
import AppMenu from './AppMenu.vue';
import ApplicationAdminButton from './pages/Applications/ApplicationAdminButton.vue';
import ApplicationModificators from './pages/Applications/ApplicationModificators.vue';
import ApplicationParams from './pages/Applications/ApplicationParams.vue';
import ApplicationsEditPage from './pages/Applications/ApplicationsEditPage.vue';
import ApplicationsPage from './pages/Applications/ApplicationsPage.vue';
import ApplicationTotalPatches from './pages/Applications/ApplicationTotalPatches.vue';
import DomainsPage from './pages/Domains/DomainsPage.vue';
import DomainsSSLGroupPage from './pages/DomainsSSLGroup/DomainsSSLGroupPage.vue';
import MainPage from './pages/Main/MainPage.vue';
import ModificatorsPage from './pages/Modificators/ModificatorsPage.vue';
import NginxFilesPage from './pages/NginxFiles/NginxFilesPage.vue';
import NotFoundPage from './pages/NotFound/NotFoundPage.vue';
import RoutesPage from './pages/Routes/RoutesPage.vue';
import ServicesPage from './pages/Services/ServicesPage.vue';
import SettingsMenu from './pages/Settings/SettingsMenu.vue';
import SettingsPage from './pages/Settings/SettingsPage.vue';
import SpaceRoutes from './pages/Spaces/SavePage/SpaceRoutes.vue';
import SpaceDomains from './pages/Spaces/SavePage/SpaceDomains.vue';
import SpaceRoles from './pages/Spaces/SavePage/SpaceRoles.vue';
import SpaceUsers from './pages/Spaces/SavePage/SpaceUsers.vue';
import SpaceListPage from './pages/Spaces/SpaceListPage.vue';
import SpaceSavePage from './pages/Spaces/SpaceSavePage.vue';
import StacksPage from './pages/Stacks/StacksPage.vue';
import TemplateEditPage from './pages/Templates/TemplateEditPage.vue';
import TemplatesListPage from './pages/Templates/TemplatesListPage.vue';
import TemplatesViewPage from './pages/Templates/TemplatesViewPage.vue';
import UsersPage from './pages/Users/UsersPage.vue';
import YamlFileSavePage from './pages/YamlFiles/YamlFileSavePage.vue';
import YamlFilesPage from './pages/YamlFiles/YamlFilesPage.vue';


export default {
    
    /* Import components */
    "CrudList": CrudList,
    "CrudSave": CrudSave,
    "CrudResult": CrudResult,
    "Dialog": Dialog,
    "Form": Form,
    "Button": Button,
    "Input": Input,
    "Label": Label,
    "Pagination": Pagination,
    "RowButtons": RowButtons,
    "RowNumber": RowNumber,
    "Select": Select,
    "SelectLabel": SelectLabel,
    "TextArea": TextArea,
    "CodeMirror": CodeMirror,
    "Tabs": Tabs,
    "Tab": Tab,
    
    /* App components */
    "AppMenu": AppMenu,
    "ApplicationAdminButton": ApplicationAdminButton,
    "ApplicationModificators": ApplicationModificators,
    "ApplicationParams": ApplicationParams,
    "ApplicationsEditPage": ApplicationsEditPage,
    "ApplicationsPage": ApplicationsPage,
    "ApplicationTotalPatches": ApplicationTotalPatches,
    "DomainsPage": DomainsPage,
    "DomainsSSLGroupPage": DomainsSSLGroupPage,
    "MainPage": MainPage,
    "ModificatorsPage": ModificatorsPage,
    "NginxFilesPage": NginxFilesPage,
    "NotFoundPage": NotFoundPage,
    "RoutesPage": RoutesPage,
    "ServicesPage": ServicesPage,
    "SettingsMenu": SettingsMenu,
    "SettingsPage": SettingsPage,
    "SpaceDomains": SpaceDomains,
    "SpaceRoles": SpaceRoles,
    "SpaceRoutes": SpaceRoutes,
    "SpaceUsers": SpaceUsers,
    "SpaceListPage": SpaceListPage,
    "SpaceSavePage": SpaceSavePage,
    "StacksPage": StacksPage,
    "TemplateEditPage": TemplateEditPage,
    "TemplatesListPage": TemplatesListPage,
    "TemplatesViewPage": TemplatesViewPage,
    "UsersPage": UsersPage,
    "YamlFileSavePage": YamlFileSavePage,
    "YamlFilesPage": YamlFilesPage,
};