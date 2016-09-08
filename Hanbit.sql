DROP SEQUENCE major_seq;
DROP SEQUENCE grade_seq;
DROP SEQUENCE art_seq;
DROP SEQUENCE subj_seq;
DROP SEQUENCE exam_seq;

CREATE SEQUENCE major_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE grade_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE art_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE subj_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
CREATE SEQUENCE exam_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;

select * from tab;
SELECT *
FROM   member
;

DROP TABLE Major CASCADE CONSTRAINT;
DROP TABLE Member CASCADE CONSTRAINT;
DROP TABLE Grade CASCADE CONSTRAINT;
DROP TABLE Board CASCADE CONSTRAINT;
DROP TABLE Subject CASCADE CONSTRAINT;
DROP TABLE Exam CASCADE CONSTRAINT;

CREATE TABLE Major(
  major_seq  INT CONSTRAINT major_pk PRIMARY KEY,
  title      VARCHAR2(100) NOT NULL
);

CREATE TABLE Member(
  mem_id      VARCHAR2(20) CONSTRAINT member_pk PRIMARY KEY,
  pw          VARCHAR2(20)  NOT NULL,
  name        VARCHAR2(20)  NOT NULL,
  gender      VARCHAR2(10)  NOT NULL,
  reg_date    VARCHAR2(20)  NOT NULL,
  ssn         VARCHAR2(10)  NOT NULL,
  email       VARCHAR2(30),
  profile_img VARCHAR2(100) DEFAULT 'default.jpg',
  role        VARCHAR2(10)  DEFAULT 'STUDENT',
  phone       VARCHAR2(13)  NOT NULL,
  major_seq   INT,
  CONSTRAINT gender_ck CHECK (gender IN ('MALE','FEMALE')),
  CONSTRAINT major_member_fk FOREIGN KEY(major_seq)
	REFERENCES Major(major_seq) ON DELETE CASCADE
);

CREATE TABLE Grade(
	grade_seq  INT CONSTRAINT grade_pk PRIMARY KEY,
	grade      VARCHAR2(5)   NOT NULL,
    term       VARCHAR2(10)  NOT NULL,
	mem_id     VARCHAR2(20)  NOT NULL,
	CONSTRAINT member_grade_fk FOREIGN KEY(mem_id)
	REFERENCES Member(mem_id) ON DELETE CASCADE
);

CREATE TABLE Board(
  art_seq    INT CONSTRAINT board_pk PRIMARY KEY,
  category   VARCHAR2(20)  NOT NULL,
  title      VARCHAR2(30)  DEFAULT 'NO TITLE',
  reg_date   VARCHAR2(20)  NOT NULL,
  content    VARCHAR2(100) DEFAULT 'NO CONTENT',
  mem_id     VARCHAR2(20),
  CONSTRAINT member_board_fk FOREIGN KEY(mem_id)
	REFERENCES Member(mem_id) ON DELETE CASCADE
);

CREATE TABLE Subject(
  subj_seq   INT CONSTRAINT subject_pk PRIMARY KEY,
  subj_name  VARCHAR2(20)  NOT NULL,
  mem_id     VARCHAR2(20)  NOT NULL,
  CONSTRAINT member_subject_fk FOREIGN KEY(mem_id)
	REFERENCES Member(mem_id) ON DELETE CASCADE
);

CREATE TABLE Exam(
  exam_seq   INT CONSTRAINT exam_pk PRIMARY KEY,
  term       VARCHAR2(10) NOT NULL,
  score      INT DEFAULT 0,
  subj_seq   INT,
  mem_id     VARCHAR2(20),
  CONSTRAINT subject_exam_fk FOREIGN KEY(subj_seq)
	REFERENCES Subject(subj_seq) ON DELETE CASCADE,
  CONSTRAINT member_exam_fk FOREIGN KEY(mem_id)
	REFERENCES Member(mem_id) ON DELETE CASCADE
);

CREATE OR REPLACE VIEW Major_view AS
SELECT m.major_seq
      ,m.title major_title
      ,u.mem_id
      ,u.pw
      ,u.name
      ,u.reg_date
      ,u.gender
      ,u.ssn
      ,u.profile_img
      ,u.email
      ,u.phone
      ,u.role
FROM   Major   m
      ,Member  u
WHERE  m.major_seq = u.major_seq      
;
CREATE OR REPLACE VIEW Grade_view AS
SELECT u.mem_id
      ,u.pw
      ,u.name
      ,u.reg_date
      ,u.gender
      ,u.ssn
      ,u.profile_img
      ,u.email
      ,u.phone
      ,u.role
      ,g.grade_seq
      ,g.grade
      ,g.term
      ,x.exam_seq
      ,x.score
      ,s.subj_seq
      ,s.subj_name
FROM   member u
      ,grade   g
      ,exam    x
      ,subject s
WHERE  u.mem_id = g.mem_id
AND    u.mem_id = x.mem_id
AND    u.mem_id = s.mem_id
AND    x.subj_seq = s.subj_seq
;
CREATE OR REPLACE VIEW Board_view AS
SELECT u.mem_id
      ,u.pw
      ,u.name
      ,u.reg_date 
      ,u.gender
      ,u.ssn
      ,u.profile_img
      ,u.email
      ,u.phone
      ,u.role
      ,b.art_seq
      ,b.content
      ,b.title
      ,b.reg_date write_date
      ,b.category
FROM   member u
      ,board  b
WHERE  u.mem_id = b.mem_id
;

CREATE OR REPLACE PROCEDURE insert_major(
	sp_title IN Major.title%TYPE
) AS
BEGIN
	INSERT INTO Major(major_seq,title)
	VALUES(major_seq.nextval,sp_title);
END insert_major;

CREATE OR REPLACE PROCEDURE insert_student(
	sp_mem_id      IN Member.mem_id%TYPE,
	sp_pw          IN Member.pw%TYPE,
	sp_name        IN Member.name%TYPE,
	sp_gender      IN Member.gender%TYPE,
	sp_reg_date    IN Member.reg_date%TYPE,
	sp_ssn         IN Member.ssn%TYPE,
	sp_email       IN Member.email%TYPE,
	sp_profile_img IN Member.profile_img%TYPE,
	sp_role        IN Member.role%TYPE,
	sp_phone       IN Member.phone%TYPE,
	sp_major_seq   IN Member.major_seq%TYPE
) AS
BEGIN
	INSERT INTO Member(mem_id,pw,name,gender,reg_date,ssn,email,profile_img,role,phone,major_seq)
	VALUES(sp_mem_id,sp_pw,sp_name,sp_gender,sp_reg_date,sp_ssn,sp_email,sp_profile_img,sp_role,sp_phone,sp_major_seq);
END insert_student;

CREATE OR REPLACE PROCEDURE insert_prof(
	sp_mem_id      IN Member.mem_id%TYPE,
	sp_pw          IN Member.pw%TYPE,
	sp_name        IN Member.name%TYPE,
	sp_gender      IN Member.gender%TYPE,
	sp_reg_date    IN Member.reg_date%TYPE,
	sp_ssn         IN Member.ssn%TYPE,
	sp_email       IN Member.email%TYPE,
	sp_profile_img IN Member.profile_img%TYPE,
	sp_role        IN Member.role%TYPE,
	sp_phone       IN Member.phone%TYPE
) AS
BEGIN
	INSERT INTO Member(mem_id,pw,name,gender,reg_date,ssn,email,profile_img,role,phone)
	VALUES(sp_mem_id,sp_pw,sp_name,sp_gender,sp_reg_date,sp_ssn,sp_email,sp_profile_img,sp_role,sp_phone);
END insert_prof;

CREATE OR REPLACE PROCEDURE insert_grade(
	sp_grade       IN Grade.grade%TYPE,
	sp_term        IN Grade.term%TYPE,
	sp_mem_id      IN Grade.mem_id%TYPE
) AS
BEGIN
	INSERT INTO Grade(grade_seq,grade,term,mem_id)
	VALUES(grade_seq.nextval,sp_grade,sp_term,sp_mem_id);
END insert_grade;

CREATE OR REPLACE PROCEDURE insert_notice(
	sp_category  IN Board.category%TYPE,
	sp_title     IN Board.title%TYPE,
	sp_reg_date  IN Board.reg_date%TYPE,
	sp_content   IN Board.content%TYPE
) AS
BEGIN
	INSERT INTO Board(art_seq,category,title ,reg_date,content)
	VALUES(art_seq.nextval,sp_category,sp_title,sp_reg_date,sp_content);
END insert_notice;

CREATE OR REPLACE PROCEDURE insert_qna(
	sp_category  IN Board.category%TYPE,
	sp_title     IN Board.title%TYPE,
	sp_reg_date  IN Board.reg_date%TYPE,
	sp_content   IN Board.content%TYPE,
	sp_mem_id    IN Board.mem_id%TYPE
) AS
BEGIN
	INSERT INTO Board(art_seq,category,title ,reg_date,content,mem_id)
	VALUES(art_seq.nextval,sp_category,sp_title,sp_reg_date,sp_content,sp_mem_id);
END insert_qna;

CREATE OR REPLACE PROCEDURE insert_subject(
	sp_subj_name IN Subject.subj_name%TYPE,
	sp_mem_id    IN Subject.mem_id%TYPE
) AS
BEGIN
	INSERT INTO Subject(subj_seq,subj_name,mem_id)
	VALUES(subj_seq.nextval,sp_subj_name,sp_mem_id);
END insert_subject;

CREATE OR REPLACE PROCEDURE insert_exam(
	sp_term      IN Exam.term%TYPE,
	sp_score     IN Exam.score%TYPE,
	sp_subj_seq  IN Exam.subj_seq%TYPE,
	sp_mem_id    IN Exam.mem_id%TYPE
) AS
BEGIN
	INSERT INTO Exam(exam_seq,term,score ,subj_seq,mem_id)
	VALUES(exam_seq.nextval,sp_term,sp_score,sp_subj_seq,sp_mem_id);
END insert_exam;



drop table account;
drop view account_member;
drop table grade;
drop view grade_member;
drop view grade_view;
drop table member;
drop table subject;
drop view subject_member;
drop table test;

select *
from   user_sequences
;
select *
from   user_objects
;
select *
from   SYS.user_constraints
order by table_name,constraint_name
;

DROP PROCEDURE HANBIT.INSERTBOARD;

EXEC insert_major('�̱���ȭ�а�');
EXEC insert_student('han','1','��ȿ��','FEMALE','2016-07-01','870222-2','han@test.com','han.jpg','STUDENT','010-1234-5678',1000);
EXEC insert_prof('haesu','1','������','FEMALE','2016-07-01','700905-2','haesu@test.com','haesu.jpg','PROFESSOR','010-1234-5678');
EXEC insert_grade('A','1-1','han');
EXEC insert_notice('�б�','������ ������ּ���','2016-09-08','���ڸ� ���� ���� ���� �ִ°��� ���־�� �մϴ�.');
EXEC insert_qna('����','�����̻��ؿ�','2016-09-08','1-1 JAVA ������ �̻� �ؿ�.','han');
EXEC insert_subject('JAVA','haesu');
EXEC insert_exam('1-1','95',1000,'han');

-- Major Query
CREATE OR REPLACE PROCEDURE count_major(
    sp_major_count OUT NUMBER
) AS
BEGIN
    SELECT COUNT(*)
    INTO   sp_major_count
    FROM   Major m;    
END count_major;
CREATE OR REPLACE PROCEDURE find_major(
    sp_major_seq IN OUT major.major_seq%TYPE,    
    sp_result       OUT VARCHAR2
) AS
    sp_title    MAJOR.TITLE%TYPE := NULL;
    major_count NUMBER := 0;
BEGIN
    SELECT COUNT(*)
    INTO   major_count
    FROM   Major m
    WHERE  m.major_seq = sp_major_seq;
    
    IF major_count > 0 THEN
       
       SELECT major_seq,title
       INTO   sp_major_seq,sp_title
       FROM   Major
       WHERE  major_seq = sp_major_seq
       ;
       sp_result := '�����ȣ : '||sp_major_seq||', ����� : '||sp_title;
    ELSE
    
       sp_result := '���� ������ �����ϴ�';
       
    END IF;
    
END find_major;

CREATE OR REPLACE PROCEDURE HANBIT.select_major(
    sp_result OUT CLOB
) AS
    sp_temp CLOB;
    sp_cnt  NUMBER := 0;
BEGIN
        
    FOR major_rec IN (SELECT m.major_seq
                            ,m.title
                      FROM   major m
                     )
    LOOP
        sp_cnt := sp_cnt + 1;
        IF sp_cnt = 1 THEN
           sp_temp := major_rec.major_seq||'  -  '||major_rec.title;
           
        ELSE
        
          sp_temp := sp_temp||CHR(10)||
                     major_rec.major_seq||'  -  '||major_rec.title;
          
        END IF;
    END LOOP;
    
    sp_result := sp_temp;
    
END select_major;

DECLARE
     sp_count NUMBER := 0;
BEGIN
    count_major(sp_count);
    DBMS_OUTPUT.PUT_LINE('���� ���� �� : '||sp_count);
    
END;  

DECLARE
    sp_major_seq major.major_seq%TYPE := 1001;
    sp_result    VARCHAR2(100) := null;
BEGIN
    find_major(sp_major_seq,sp_result);
    DBMS_OUTPUT.PUT_LINE(sp_result);
    
END;    

DECLARE
     sp_result CLOB;
BEGIN
    select_major(sp_result);
    DBMS_OUTPUT.PUT_LINE(sp_result);
    
END; 

DECLARE
    pkg_major    major%ROWTYPE;
    CURSOR cur IS
    SELECT major_seq,title
    FROM   Major;    
BEGIN
    FOR pkg_major IN cur
    LOOP
        EXIT WHEN cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(pkg_major.major_seq||'  -  '||pkg_major.title);
    END LOOP;    
END;

-- member store procedure
CREATE OR REPLACE PROCEDURE count_member(
    sp_member_count OUT NUMBER
) AS
BEGIN
    SELECT COUNT(*)
    INTO   sp_member_count
    FROM   member u;    
END count_member;

CREATE OR REPLACE PROCEDURE find_by_id(
    sp_mem_id  IN member.mem_id%TYPE,    
    sp_result OUT VARCHAR2
) AS
    sp_pw          member.pw%TYPE;
    sp_name        member.name%TYPE;
    sp_gender      member.gender%TYPE;
    sp_reg_date    member.reg_date%TYPE;
    sp_ssn         member.ssn%TYPE;
    sp_email       member.email%TYPE;
    sp_profile_img member.profile_img%TYPE;
    sp_role        member.role%TYPE;
    sp_phone       member.phone%TYPE;
    sp_major_seq   member.major_seq%TYPE;
    mem_count   NUMBER := 0;
BEGIN
    SELECT COUNT(*)
    INTO   mem_count
    FROM   member m
    WHERE  m.mem_id = sp_mem_id;
    
    IF mem_count > 0 THEN
       
       SELECT pw,
              name,
              gender,
              reg_date,
              ssn,
              email,
              profile_img,
              role,
              phone,
              major_seq
       INTO   sp_pw,
              sp_name,
              sp_gender,
              sp_reg_date,
              sp_ssn,
              sp_email,
              sp_profile_img,
              sp_role,
              sp_phone,
              sp_major_seq
       FROM   member m
       WHERE  m.mem_id = sp_mem_id
       ;
       sp_result := '��� ID : '||sp_mem_id||', ��� : '||sp_pw||', �̸� : '||sp_name||
                    ', ���� : '||sp_gender||', �������� : '||sp_reg_date||', SSN : '||sp_ssn||
                    ', �̸��� : '||sp_email||', ���� : '||sp_profile_img||', ���� : '||sp_role||
                    ', ��ȭ��ȣ : '||sp_phone||', �������� : '||sp_major_seq;
    ELSE
    
       sp_result := sp_mem_id||' ����� �����ϴ�';
       
    END IF;
    
END find_by_id;

DECLARE
     sp_count NUMBER := 0;
BEGIN
    count_member(sp_count);
    DBMS_OUTPUT.PUT_LINE('����� : '||sp_count);
    
END;

DECLARE    
    sp_result    VARCHAR2(3000) := null;
BEGIN
    
    FOR mem_rec IN (SELECT mem_id
                    FROM   member
                   )
    LOOP
                   
        find_by_id(mem_rec.mem_id,sp_result);
        DBMS_OUTPUT.PUT_LINE(sp_result);
    END LOOP;    
END; 

select *
from   member
;
select * from major;
select * from subject;

begin
  SYS.dbms_output.put_line('HELLO WORD');
END;
