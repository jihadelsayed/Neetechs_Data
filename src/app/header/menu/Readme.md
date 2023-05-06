
------------------------------------------------------------------------------------------
# create two files

## one for json translation in the locale folder called menu.json
"""
import menuTranslations from 'src/locale/menu.json';

"""
### with this content 
"""
{
  "en": {
    "": ""
  },
  "ar": {
    "": ""
  }
}

"""
------------------------------------------------------------------------------------------
## and one for menu values in environment folder called menu.ts
"""
import { menu } from 'src/environments/menu';

"""
### with this content 
"""
export const menu = [
  {
    id: 1,
    title: "",
    routerLink: "",
  },
]

"""
------------------------------------------------------------------------------------------
## also add this to the tsconfig file to enable the resolve json module
"""
  "resolveJsonModule": true,
  "allowSyntheticDefaultImports" :true
"""
