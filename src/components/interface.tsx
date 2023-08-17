export interface Pokemon {
  id: number;
  name: string;
  types: Types[];
  abilities: Ability[];
  sprites: Sprites;
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