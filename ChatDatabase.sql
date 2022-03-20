drop database if exists ChatDB;
create database if not exists ChatDB;
use ChatDB;

create table Accounts(
    idAccount int not null primary key auto_increment,
    username varchar(255) not null,
    password varchar(255) not null,
    foto varchar(255),
    dataCreazione date not null default now()
) ENGINE=InnoDB;

create table Messaggi(
    idMessaggio int not null primary key auto_increment,
    codAccount int not null,
    foreign key (codAccount) references Accounts(idAccount) on delete cascade,
    codMessaggioRisposta int,
    foreign key (codMessaggioRisposta) references Messaggi(idMessaggio),
    dataInvio date not null default now(),
    messaggio text not null
) ENGINE=InnoDB;