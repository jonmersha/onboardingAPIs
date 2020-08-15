create table CUSTOMER(
    customer_id int primary key,
    message_id varchar(10) ,
    nemonic varchar(10),
    full_name varchar(100),
    current_status varchar(20),
    meker_id int,
    meker_time int,
    checked_by int,
    check_time datetime,
    check_status int,
    approver int,
    approval_status int
);

create table account(
    customer_id int,
    account_number int,
    link_date int,
    meker_id int,
    meker_time int,
    checked_by int,
    check_time datetime,
    check_status int,
    approver int,
    approval_status int,
    primary key(customer_id,account_number)
);

create table users_policy(
    users_id int,
    meker_right int,
    authorizer_right int,
    primary key(users_id,maker_right,authorizer_right)
);
--officer can  create the users account via mobie and 
--can activate his account number
create table officer(
    users_id int auto-increment,
    mobile_number varchar(20),
    branch_code varchar(20),
    first_name varchar(50),
    midle_name varchar(20)
    last_name varchar(20),
    status_ varchar(20),
    primary key(mobile_number)
)
INSERT INTO `onbording`.`field_oficer`
(`users_id`,
`mobile_number`,
`branch_code`,
`first_name`,
`midle_name`,
`last_name`,
`status_`)
VALUES
(<{users_id: }>,
<{mobile_number: }>,
<{branch_code: }>,
<{first_name: }>,
<{midle_name: }>,
<{last_name: }>,
<{status_: }>);

create table OTP(
    users_id int,
    OTP int,
    is_sent_to_user boolean,
    resend_count int,
    max_resend int,
    OTP_gen_time datetime,
    OTP_expire_time datetime,
    is_expired boolean,
    attempt_count int,
    max_attempt int,
    primary key(users_id)
)
create table mantab(
    auid int,
    mobile_number varchar(10)
    full_name varchar(20),
    passwordCode varchar(100)
) 