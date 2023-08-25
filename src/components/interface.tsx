export interface Results {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: Types[];
  abilities: Ability[];
  sprites: Sprites;
  stats: Stats[];
}

export interface Species {
  name: string;
  url: string;
}

export interface Types {
  slot: number;
  type: Species;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Sprites {
  front_default: string;
  other: Dream_world;
}

export interface Dream_world {
  front_default: string;
  front_female: string | null;
} 

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {name: string, url: string};
}

export interface Hp {
  base_stat: number;
  effort: number;
  name: string;
}

export interface Attack {
  base_stat: number;
  effort: number;
  name: string;
}

export interface Defense {
  base_stat: number;
  effort: number;
  name: string;
}

export interface SpecialAttack {
  base_stat: number;
  effort: number;
  name: string;
}

export interface SpecialDefense {
  base_stat: number;
  effort: number;
  name: string;
}

export interface Speed {
  base_stat: number;
  effort: number;
  name: string;
}

export interface typeColorInterface {
  [key: string]: string;
}

export interface LogoTypes {
  [key: string]: string;
}