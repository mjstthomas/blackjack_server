
create table users (
    id text primary key not null,
    user_name text not null,
    user_email text not null,
    password text not null
);

create table user_purse (
    id text references users(id) on delete cascade not null,
    wins integer default 0,
    total_games integer default 0,
    correct integer default 0
);

create table if not exists blackjack_strategy (
    id integer not null,
    "A" text not null,
    "K" text not null,
    "Q" text not null,
    "J" text not null,
    "10" text not null,
    "9" text not null,
    "8" text not null,
    "7" text not null,
    "6" text not null,
    "5" text not null,
    "4" text not null,
    "3" text not null,
    "2" text not null
);