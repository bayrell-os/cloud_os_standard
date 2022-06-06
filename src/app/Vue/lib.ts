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

/**
 * VueJS Mixin
 */
 export const mixin_lib =
 {
    methods:
	{
        attr(obj: any, keys: Array<string> | string, default_value: any = null)
        {
            if (keys instanceof String || typeof keys == "string")
            {
                let s = String(keys);
                keys = new Array();
                keys.push(s)
            }

            let res:any = obj;
            for (let i=0; i<keys.length; i++)
            {
                let key:string = keys[i];
                if (res[key] == undefined) return default_value;
                res = res[key];
            }

            return res;
        }
    }
 }


export class BaseObject
{
    /**
	 * Assign values
	 */
	assignValues(params:Record<string, any>): BaseObject
	{
        return this;
    }
    
}


export function removeDuplicates(items: Array<any>): Array<any>
{
    items = items.filter( (value, index) => items.indexOf(value) === index );
    return items;
}


export function findIndexByKey(obj: Array<Record<string, any>>, key: string, value: any): number
{
    for (let i=0; i<obj.length; i++)
    {
        if (obj[i][key] == value)
        {
            return i;
        }
    }
    return -1;
}

export function findItemByKey(obj: Array<Record<string, any>>, key: string, value: any): any
{
    let index = findIndexByKey(obj, key, value);
    if (index == -1) return null;
    return obj[index];
}