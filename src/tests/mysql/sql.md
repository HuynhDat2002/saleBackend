create table test_table(
    id int not null primary key,
    name varchar(255) default null,
    age int default null,
    address varchar(255) default null
) engine=InnoDB default charset=utf8mb4;

//create procedure;

create definer = `trongdat`@`%` procedure `insert data`()
begin
    declare max_id int default 10000000;
    declare i int default 1;
    while i<=max_id do
        insert into test_table (id,name,age,address) values (i,concat('Name',i)), i%100,concat('Address',i);
        set i = i+1;
    end while;
end


// partition
create table orders(
	order_id int,
    order_date date not null,
    total_amount decimal(10,2),
    primary key (order_id,order_date)
)

partition by range columns (order_date)(
	partition p0 values less than ('2024-01-01'),
    partition p1 values less than ('2024-02-01'),
	partition p2 values less than ('2024-03-01'),
	partition pmax values less than (maxvalue)
)


create table users (
    `user_id` int not null auto_increment,
    `user_age` int default '0',
    `user_status` int default '0',
    `user_name` varchar(128) collate utf8mb4_bin default null,
    `user_email` varchar(128) collate utf8mb4_bin default null,
    `user_address` varchar(128) collate utf8mb4_bin default null,

    primary key (`user_id`),
    key `inx_email_age_name` (`user_email`,`user_age`,`user_name`),
    key `inx_status` (`user_status`)
) engine=InnoDB auto_increment=4 default charset=utf8mb4 collate utf8mb4_bin;

insert into users (user_id,user_age, user_status, user_name,user_email,user_address) values (
	3, 22,1,'user3','user3@gmail.com','cmt8,hcm'
)