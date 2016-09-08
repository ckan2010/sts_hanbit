DROP SEQUENCE book_seq;
DROP SEQUENCE customer_seq;
DROP SEQUENCE order_seq;

CREATE SEQUENCE book_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE customer_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE order_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;

DROP TABLE Book CASCADE CONSTRAINT;
DROP TABLE Customer CASCADE CONSTRAINT;
DROP TABLE Orders CASCADE CONSTRAINT;

CREATE TABLE Book(
  book_seq    INT           CONSTRAINT book_pk PRIMARY KEY,
  book_name   VARCHAR2(40)  NOT NULL,
  publisher   VARCHAR2(40)  NOT NULL,
  price       NUMBER        DEFAULT 0 NOT NULL 
);

CREATE TABLE Customer(
	customer_seq  INT CONSTRAINT customer_pk PRIMARY KEY,
	customer_name VARCHAR2(40)   NOT NULL,
    address       VARCHAR2(50)   NOT NULL,
	phone         VARCHAR2(13)   NOT NULL
);

CREATE TABLE Orders(
  order_seq    INT CONSTRAINT order_pk PRIMARY KEY,
  sale_qty     NUMBER  NOT NULL,
  order_date   VARCHAR2(20) NOT NULL,
  customer_seq INT     NOT NULL,
  book_seq     INT     NOT NULL,
  CONSTRAINT book_order_fk FOREIGN KEY(book_seq)
	REFERENCES book(book_seq) ON DELETE CASCADE,
  CONSTRAINT customer_order_fk FOREIGN KEY(customer_seq)
	REFERENCES customer(customer_seq) ON DELETE CASCADE	
);

CREATE OR REPLACE VIEW Order_view AS
SELECT b.book_seq
      ,b.book_name
      ,b.publisher
      ,b.price
      ,c.CUSTOMER_SEQ
      ,c.customer_name
      ,c.ADDRESS
      ,c.PHONE
      ,o.ORDER_SEQ
      ,o.SALE_QTY
FROM   Book      b
      ,Customer  c
      ,Orders    o
WHERE  o.book_seq     = b.book_seq
AND    o.customer_seq = o.customer_seq   
;

CREATE OR REPLACE PROCEDURE insert_book(
	sp_book_name   IN book.book_name%TYPE,
	sp_publisher   IN book.publisher%TYPE,
	sp_price       IN book.price%TYPE
) AS
BEGIN
	INSERT INTO Book(book_seq,book_name,publisher,price)
	VALUES(book_seq.nextval,sp_book_name,sp_publisher,sp_price);
END insert_book;

CREATE OR REPLACE PROCEDURE insert_customer(
	sp_customer_name   IN customer.customer_name%TYPE,
	sp_address         IN customer.address%TYPE,
	sp_phone           IN customer.phone%TYPE
) AS
BEGIN
	INSERT INTO Customer(customer_seq,customer_name,address,phone)
	VALUES(customer_seq.nextval,sp_customer_name,sp_address,sp_phone);
END insert_customer;

CREATE OR REPLACE PROCEDURE insert_orders(
	sp_sale_qty      IN orders.sale_qty%TYPE,
	sp_order_date    IN orders.order_date%TYPE,
	sp_customer_seq  IN orders.customer_seq%TYPE,
	sp_book_seq      IN orders.book_seq%TYPE
) AS
BEGIN
	INSERT INTO Orders(order_seq,sale_qty,order_date,customer_seq,book_seq)
	VALUES(order_seq.nextval,sp_sale_qty,sp_order_date,sp_customer_seq,sp_book_seq);
END insert_orders;

EXEC insert_book('�౸�� ����','�½�����',7000);
EXEC insert_book('�౸�ƴ� ����','������',13000);
EXEC insert_book('�౸�� ����','���ѹ̵��',22000);
EXEC insert_book('���� ���̺�','���ѹ̵��',35000);
EXEC insert_book('�ǰ� ����','�½�����',8000);
EXEC insert_book('���� �ܰ躰���','�½�����',6000);
EXEC insert_book('�߱��� �߾�','�̻�̵��',20000);
EXEC insert_book('�߱��� ��Ź��','�̻�̵��',13000);
EXEC insert_book('�ø��� �̾߱�','�Ｚ��',7500);
EXEC insert_book('Olympic Champions','Pearson',13000);
EXEC insert_book('����������','������м���',25000);

EXEC insert_customer('������','���� ��ü��Ÿ','010-1234-5678');
EXEC insert_customer('�迬��','���ѹα� ����','010-3333-3333');
EXEC insert_customer('��̶�','���ѹα� ������','010-2222-2222');
EXEC insert_customer('�߽ż�','�̱� Ŭ������','010-5555-5555');
EXEC insert_customer('�ڼ���','���ѹα� ����','010-6666-6666');

EXEC insert_orders(1,'2016-01-01 11:03:03',1000,1000);
EXEC insert_orders(2,'2016-01-02 11:03:03',1000,1002);
EXEC insert_orders(1,'2016-01-02 11:03:03',1001,1004);
EXEC insert_orders(1,'2016-01-03 11:03:03',1002,1005);
EXEC insert_orders(3,'2016-01-04 11:03:03',1003,1006);
EXEC insert_orders(1,'2016-01-04 11:03:03',1000,1001);
EXEC insert_orders(1,'2016-01-05 11:03:03',1003,1007);
EXEC insert_orders(4,'2016-01-06 11:03:03',1002,1009);
EXEC insert_orders(1,'2016-01-06 11:03:03',1001,1009);
EXEC insert_orders(3,'2016-01-06 11:03:03',1002,1007);

select * from book;

select * from customer;