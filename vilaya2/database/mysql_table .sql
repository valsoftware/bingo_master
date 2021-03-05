drop table if exists ww01_q_a;
drop table if exists wp02_q_a;
drop table if exists invite;
drop table if exists games;
drop table if exists users;

create table users(
    user_id       int auto_increment         not null,
    user_name     nvarchar(100)               not null,
    email_id      nvarchar(100)               not null,                        
    password     nvarchar(100)               not null,
    primary key (user_id) 
);

create table games(
   user_id      int                          not null,
   game_id      int auto_increment           not null,
   game_type    int                          not null,
   game_name    nvarchar(100)                 not null,
   game_level   nvarchar(10)                  not null,  
   about_game   nvarchar(200)                 not null,  
   primary key (game_id),
   foreign key(user_id) references users(user_id)
);

create table ww01_q_a(
   game_id      int                          not null,
   q_a_id       int auto_increment           not null,
   question     nvarchar(1000)                null,
   answer       nvarchar(1000)                null,
   primary key (q_a_id),
   foreign key(game_id) references games(game_id)
);

create table wp02_q_a(
   game_id      int                          not null,
   q_a_id       int auto_increment           not null,
   question     nvarchar(1000)                null,
   answer       mediumtext                   null,
   primary key (q_a_id),
   foreign key(game_id) references games(game_id)
);

create table invite(
   user_id              int                      not null,
   game_id              int                      not null,
   invit_id             int auto_increment       not null,
   attendee_user_id     int                      not null,
   game_type            int                      not null,
   room_id              nvarchar(100)             not null,
   primary key (invit_id),
   foreign key(user_id) references users(user_id),
   foreign key(game_id) references games(game_id)
);