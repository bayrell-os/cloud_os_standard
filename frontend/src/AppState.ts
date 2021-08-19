import { MainPageState } from '@/pages/Main/MainPageState'

export class AppState
{
	MainPage: MainPageState = new MainPageState();


	/**
	 * Returns methods list
	 */
	static mutations(): Array<string>
	{
		let res: Array<string> =
		[
		];
		return res;
	}


	/**
	 * Returns modules
	 */
	static modules(): Record<string, any>
	{
		let res: Record<string, any> =
		{
			"MainPage": MainPageState,
		};
		return res;
	}

}
