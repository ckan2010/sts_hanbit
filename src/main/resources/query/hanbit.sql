/*
======== META_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE DATE : 2016-08-01
@UPDATE DATE : 2016-09-20
@DESC : 메타데이터
*/
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
SELECT object_name
FROM   user_procedures
order by object_name
;
DROP PROCEDURE insert_exam;
DROP PROCEDURE HANBIT.INSERTBOARD;
select * from tab;
/*
================ MAJOR_GROUP ==============
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
DROP SEQUENCE major_seq;
CREATE SEQUENCE major_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
DROP TABLE Major CASCADE CONSTRAINT;
-- TABLE CREATE ORDER #1
CREATE TABLE Major(
  major_seq  INT CONSTRAINT major_pk PRIMARY KEY,
  title      VARCHAR2(100) NOT NULL UNIQUE
);
select * from major;
CREATE OR REPLACE VIEW Major_view AS
SELECT m.major_seq AS majorSeq
      ,m.title AS majorTitle
      ,u.mem_id AS id
      ,u.pw
      ,u.name
      ,u.reg_date AS regDate
      ,u.gender
      ,u.ssn
      ,u.profile_img AS profileImg
      ,u.email
      ,u.phone
      ,u.role
      ,substrb(u.ssn,1,6) birth
FROM   Major   m
      ,Member  u
WHERE  m.major_seq = u.major_seq      
;
select *
from   Major_view;
-- SP_INSERT_MAJOR
CREATE OR REPLACE PROCEDURE insert_major(
	sp_title IN Major.title%TYPE
) AS
BEGIN
	INSERT INTO Major(major_seq,title)
	VALUES(major_seq.nextval,sp_title);
END insert_major;
----- SELECT MAJOR -----
SELECT *
FROM   major
;
-- EXE_INSERT_MAJOR
EXEC insert_major('컴퓨터공학과');
-- SP_COUNT_MAJOR
CREATE OR REPLACE PROCEDURE count_major(sp_major_count OUT NUMBER) AS
BEGIN SELECT COUNT(*) INTO sp_major_count FROM   Major m;END count_major;
-- EXE_COUNT_MAJOR
DECLARE sp_count NUMBER := 0;BEGIN count_major(sp_count);DBMS_OUTPUT.PUT_LINE('전공 과목 숫 : '||sp_count);END;  
-- SP_FIND_BY_MAJOR_SEQ
CREATE OR REPLACE PROCEDURE find_by_major_seq(
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
       sp_result := '과목번호 : '||sp_major_seq||', 과목명 : '||sp_title;
    ELSE
    
       sp_result := '전공 과목이 없습니다';
       
    END IF;
    
END find_by_major_seq;
-- EXC_FIND_BY_MAJOR_SEQ
DECLARE
    sp_major_seq major.major_seq%TYPE := 1001;
    sp_result    VARCHAR2(100) := null;
BEGIN
    find_by_major_seq(sp_major_seq,sp_result);
    DBMS_OUTPUT.PUT_LINE(sp_result);
    
END;
-- SP_ALL_MAJOR
CREATE OR REPLACE PROCEDURE HANBIT.all_major(
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
           sp_temp := major_rec.major_seq||','||major_rec.title;
           
        ELSE
        
          sp_temp := sp_temp||CHR(10)||
                     major_rec.major_seq||','||major_rec.title;
          
        END IF;
    END LOOP;
    
    sp_result := sp_temp;
    
END all_major;
-- EXC_ALL_MAJOR
DECLARE
     sp_result CLOB;
BEGIN
    all_major(sp_result);
    DBMS_OUTPUT.PUT_LINE(sp_result);
    
END; 
-- EXC_ALL_MAJOR
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
-- SP_CURSOR_RETURN_ALL_MAJOR
CREATE OR REPLACE PROCEDURE HANBIT.all_major(
    major_cur OUT SYS_REFCURSOR
) AS
BEGIN        
    OPEN major_cur FOR SELECT major_seq,title FROM major ORDER BY major_seq;
END all_major;
-- EXC_RETURN_CURSOR_ALL_MAJOR
DECLARE
    sp_major_cur SYS_REFCURSOR;
    sp_marjor_rec major%ROWTYPE;
BEGIN
    all_major(sp_major_cur);
    LOOP 
    FETCH sp_major_cur 
    INTO sp_marjor_rec;
        EXIT WHEN sp_major_cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(sp_marjor_rec.major_seq||','||sp_marjor_rec.title);
    END LOOP;
    CLOSE sp_major_cur;
END;
-- SP_UPDATE_MAJOR
CREATE OR REPLACE PROCEDURE update_major(
    sp_title     IN major.title%TYPE,
    sp_major_seq IN major.major_seq%TYPE
)
AS
BEGIN    
    UPDATE Major SET title = sp_title WHERE major_seq = sp_major_seq;
END update_major;
-- EXC_UPDATE_MAJOR
BEGIN update_major('예술학부',1007);END;
-- SP_DELETE_MAJOR
CREATE OR REPLACE PROCEDURE delete_major(sp_major_seq IN major.major_seq%TYPE) AS
BEGIN DELETE FROM  Major WHERE major_seq = sp_major_seq;END delete_major;
-- EXC_DELETE_MAJOR
BEGIN delete_major(1007);END;
/*
========== PROF_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
DROP TABLE Member CASCADE CONSTRAINT;
-- TABLE CREATE ORDER #2
CREATE TABLE Member(
  mem_id      VARCHAR2(20) CONSTRAINT member_pk PRIMARY KEY,
  pw          VARCHAR2(20)  NOT NULL,
  name        VARCHAR2(20)  NOT NULL,
  gender      VARCHAR2(10)  NOT NULL,
  reg_date    VARCHAR2(20)  NOT NULL,
  ssn         VARCHAR2(10)  NOT NULL UNIQUE,
  email       VARCHAR2(30),
  profile_img VARCHAR2(100) DEFAULT 'default.jpg',
  role        VARCHAR2(10)  DEFAULT 'STUDENT',
  phone       VARCHAR2(13)  NOT NULL UNIQUE,
  major_seq   INT,
  CONSTRAINT gender_ck CHECK (gender IN ('MALE','FEMALE')),
  CONSTRAINT major_member_fk FOREIGN KEY(major_seq)
	REFERENCES Major(major_seq) ON DELETE CASCADE
);
select *
from   member
;
-- SP_INSERT_PROFESSOR
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
-- EXC_INSERT_PROFESSOR
EXEC insert_prof('prof_james','1','제임스 고슬링','MALE','2016-08-01','620905-1','james@test.com','prof_james.jpg','PROF','010-1234-5678');
-- SP_COUNT_PROFESSOR
CREATE OR REPLACE PROCEDURE count_prof(sp_count OUT NUMBER) AS
BEGIN SELECT COUNT(*) INTO sp_count FROM Member m WHERE role = 'PROF' ;END count_prof;
-- EXE_COUNT_MAJOR
DECLARE sp_count NUMBER := 0;
BEGIN 
count_prof(sp_count);
DBMS_OUTPUT.PUT_LINE('교수인원 : '||sp_count||' 명');END;
-- SP_EXIST_MEMBER_ID
CREATE OR REPLACE FUNCTION exist_member_id(sp_mem_id IN member.mem_id%TYPE) 
RETURN NUMBER AS 
    sp_cnt NUMBER := 0;
BEGIN 
 SELECT COUNT(*)
 INTO   sp_cnt
 FROM   member m
 WHERE  m.mem_id = sp_mem_id;
 RETURN sp_cnt;
END exist_member_id; 
-- EXE_EXIST_MEMBER_ID
DECLARE
    sp_mem_cnt NUMBER := 0;
    sp_mem_id  VARCHAR2(20) := 'haesu';
BEGIN
    sp_mem_cnt := exist_member_id(sp_mem_id);
    IF sp_mem_cnt = 0 THEN
       DBMS_OUTPUT.PUT_LINE('존재하지 않는 멤버 입니다.');
    END IF;
    
END;    
-- SP_FIND_BY_PROF_ID
CREATE OR REPLACE PROCEDURE find_by_prof_id(
    sp_prof_id      IN member.mem_id%TYPE,
    sp_prof_rec    OUT member%ROWTYPE    
) AS BEGIN SELECT * INTO sp_prof_rec FROM member WHERE mem_id = sp_prof_id;END find_by_prof_id;
-- EXC_FIND_BY_PROF_ID
DECLARE
    sp_mem_id    member.mem_id%TYPE := 'prof_james';
    sp_prof_rec  member%ROWTYPE;
    sp_mem_cnt   NUMBER := 0;
BEGIN
    sp_mem_cnt := exist_member_id(sp_mem_id);
    IF sp_mem_cnt = 0 THEN
       DBMS_OUTPUT.PUT_LINE('존재하지 않는 멤버 입니다.');
    ELSE
       find_by_prof_id(sp_mem_id,sp_prof_rec);
        DBMS_OUTPUT.PUT_LINE('멤버 ID : '||sp_prof_rec.mem_id||', 비번 : '||sp_prof_rec.pw||', 이름 : '||sp_prof_rec.name||
                            ', 성별 : '||sp_prof_rec.gender||', 입학일자 : '||sp_prof_rec.reg_date||', SSN : '||sp_prof_rec.ssn||
                            ', 이메일 : '||sp_prof_rec.email||', 사진 : '||sp_prof_rec.profile_img||', 권한 : '||sp_prof_rec.role||
                            ', 전화번호 : '||sp_prof_rec.phone);
    END IF;    
END;
-- SP_ALL_PROF
CREATE OR REPLACE PROCEDURE all_prof(
    sp_prof_cur OUT SYS_REFCURSOR
) AS
BEGIN        
    OPEN sp_prof_cur FOR SELECT * FROM member WHERE role = 'PROF';
END all_prof;
-- EXE_ALL_PROF
DECLARE
    sp_prof_cur SYS_REFCURSOR;
    sp_prof_rec member%ROWTYPE;
BEGIN
    all_prof(sp_prof_cur);
    LOOP 
    FETCH sp_prof_cur 
    INTO sp_prof_rec;
        EXIT WHEN sp_prof_cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('멤버 ID : '||sp_prof_rec.mem_id||', 비번 : '||sp_prof_rec.pw||', 이름 : '||sp_prof_rec.name||
                            ', 성별 : '||sp_prof_rec.gender||', 입학일자 : '||sp_prof_rec.reg_date||', SSN : '||sp_prof_rec.ssn||
                            ', 이메일 : '||sp_prof_rec.email||', 사진 : '||sp_prof_rec.profile_img||', 권한 : '||sp_prof_rec.role||
                            ', 전화번호 : '||sp_prof_rec.phone);
    END LOOP;
    CLOSE sp_prof_cur;
END;
-- SP_UPDATE_PROF
CREATE OR REPLACE PROCEDURE update_prof(
    sp_prof_id    IN member.mem_id%TYPE,
    sp_prof_pw    IN member.pw%TYPE,
    sp_prof_email IN member.email%TYPE,
    sp_prof_phone IN member.phone%TYPE
)
AS
BEGIN    
    UPDATE Member SET pw = NVL(sp_prof_pw,pw),email = NVL(sp_prof_email,email),phone = NVL(sp_prof_phone,phone) WHERE mem_id = sp_prof_id AND role = 'PROF';
END update_prof;
-- EXC_UPDATE_PROF
BEGIN update_prof('haesu',2,null,null);END;
-- SP_DELETE_MAJOR
CREATE OR REPLACE PROCEDURE delete_prof(sp_prof_id IN member.mem_id%TYPE) AS
BEGIN DELETE FROM  Member WHERE mem_id = sp_prof_id AND role = 'PROF';END delete_prof;
-- EXC_DELETE_MAJOR
BEGIN delete_prof('prof_james');END;
/*
========== MEMBER_STUDENT_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
-- SP_INSERT_STUDENT
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
-- EXC_INSERT_STUDENT
EXEC insert_student('han','1','한효주','FEMALE','2016-07-01','870222-2','han@test.com','han.jpg','STUDENT','010-1234-5678',1000);
-- SP_COUNT_STUDENT
CREATE OR REPLACE PROCEDURE count_student(sp_student_cnt OUT NUMBER) AS
BEGIN SELECT COUNT(*) INTO sp_student_cnt FROM member u WHERE u.role = 'STUDENT'; commit; END count_student;
-- EXC_COUNT_MEMBER
DECLARE sp_count NUMBER := 0;BEGIN count_student(sp_count);DBMS_OUTPUT.PUT_LINE('학생 : '||sp_count||' 명');END;
-- SP_FIND_BY_STUDENT_ID
CREATE OR REPLACE PROCEDURE find_by_student_id(
    sp_student_id      IN member.mem_id%TYPE,
    sp_student_rec    OUT member%ROWTYPE    
) AS BEGIN SELECT * INTO sp_student_rec FROM member WHERE mem_id = sp_student_id AND role = 'STUDENT'; commit; END find_by_student_id;
-- EXC_FIND_BY_STUDENT_ID
DECLARE
    sp_mem_id    member.mem_id%TYPE := 'han';
    sp_student_rec  member%ROWTYPE;
    sp_mem_cnt   NUMBER := 0;
BEGIN
    sp_mem_cnt := exist_member_id(sp_mem_id);
    IF sp_mem_cnt = 0 THEN
       DBMS_OUTPUT.PUT_LINE('존재하지 않는 학생 입니다.');
    ELSE
       find_by_student_id(sp_mem_id,sp_student_rec);
        DBMS_OUTPUT.PUT_LINE('멤버 ID : '||sp_student_rec.mem_id||', 비번 : '||sp_student_rec.pw||', 이름 : '||sp_student_rec.name||
                            ', 성별 : '||sp_student_rec.gender||', 입학일자 : '||sp_student_rec.reg_date||', SSN : '||sp_student_rec.ssn||
                            ', 이메일 : '||sp_student_rec.email||', 사진 : '||sp_student_rec.profile_img||', 권한 : '||sp_student_rec.role||
                            ', 전화번호 : '||sp_student_rec.phone||', 전공 SEQ : '||sp_student_rec.major_seq);
    END IF;    
END;
-- SP_ALL_STUDENT
CREATE OR REPLACE PROCEDURE all_student(
    sp_student_cur OUT SYS_REFCURSOR
) AS
BEGIN        
    OPEN sp_student_cur FOR SELECT * FROM member WHERE role = 'STUDENT';
    commit;
END all_student;
-- EXE_ALL_STUDENT
DECLARE
    sp_student_cur SYS_REFCURSOR;
    sp_student_rec member%ROWTYPE;
BEGIN
    all_student(sp_student_cur);
    LOOP 
    FETCH sp_student_cur 
    INTO sp_student_rec;
        EXIT WHEN sp_student_cur%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE('멤버 ID : '||sp_student_rec.mem_id||', 비번 : '||sp_student_rec.pw||', 이름 : '||sp_student_rec.name||
                            ', 성별 : '||sp_student_rec.gender||', 입학일자 : '||sp_student_rec.reg_date||', SSN : '||sp_student_rec.ssn||
                            ', 이메일 : '||sp_student_rec.email||', 사진 : '||sp_student_rec.profile_img||', 권한 : '||sp_student_rec.role||
                            ', 전화번호 : '||sp_student_rec.phone||', 전공순서 : '||sp_student_rec.major_seq);
    END LOOP;
    CLOSE sp_student_cur;
END;
-- SP_UPDATE_STUDENT
CREATE OR REPLACE PROCEDURE update_student(
    sp_student_id    IN member.mem_id%TYPE,
    sp_student_pw    IN member.pw%TYPE,
    sp_student_email IN member.email%TYPE,
    sp_student_phone IN member.phone%TYPE
)
AS
BEGIN    
    UPDATE Member SET pw = NVL(sp_student_pw,pw),email = NVL(sp_student_email,email),phone = NVL(sp_student_phone,phone) WHERE mem_id = sp_student_id AND role = 'STUDENT';
    COMMIT;
END update_student;
-- EXC_UPDATE_STUDENT
DECLARE
    sp_mem_id    member.mem_id%TYPE := 'han';
    sp_student_rec  member%ROWTYPE;
    sp_mem_cnt   NUMBER := 0;
BEGIN
    sp_mem_cnt := exist_member_id(sp_mem_id);
    IF sp_mem_cnt = 0 THEN
       DBMS_OUTPUT.PUT_LINE('존재하지 않는 학생 입니다.');
    ELSE
       update_student('han',2,null,null);
        DBMS_OUTPUT.PUT_LINE('학생 정보 수정 완료');
    END IF;    
END;
-- SP_DELETE_STUDENT
CREATE OR REPLACE PROCEDURE delete_student(sp_student_id IN member.mem_id%TYPE) AS
BEGIN DELETE FROM  Member WHERE mem_id = sp_student_id AND role = 'STUDENT'; COMMIT; END delete_student;
-- EXC_DELETE_MAJOR
BEGIN delete_student('han');END;
/*
========== GRADE_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
DROP SEQUENCE grade_seq;
CREATE SEQUENCE grade_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
DROP TABLE Grade CASCADE CONSTRAINT;
-- TABLE CREATE ORDER #3
CREATE TABLE Grade(
	grade_seq  INT CONSTRAINT grade_pk PRIMARY KEY,
	grade      VARCHAR2(5)   NOT NULL,
    term       VARCHAR2(10)  NOT NULL,
	mem_id     VARCHAR2(20)  NOT NULL,
	CONSTRAINT member_grade_fk FOREIGN KEY(mem_id)
	REFERENCES Member(mem_id) ON DELETE CASCADE
);
select *
from   grade
;
CREATE OR REPLACE VIEW Grade_view AS
SELECT u.mem_id AS id
      ,u.pw
      ,u.name
      ,u.reg_date AS regDate
      ,u.gender 
      ,u.ssn
      ,u.profile_img AS profileImg
      ,u.email
      ,u.phone
      ,u.role
      ,substrb(u.ssn,1,6) AS birth
      ,g.grade_seq AS gradeSeq
      ,g.grade
      ,g.term
      ,x.exam_seq AS examSeq
      ,x.score
      ,s.subj_seq AS subjSeq
      ,s.subj_name AS subjName
FROM   member u
      ,grade   g
      ,exam    x
      ,subject s
WHERE  u.mem_id = g.mem_id
AND    u.mem_id = x.mem_id
AND    u.mem_id = s.mem_id
AND    x.subj_seq = s.subj_seq
;
select *
from   Grade_view;
-- SP_INSERT_GRADE
CREATE OR REPLACE PROCEDURE insert_grade(
	sp_grade       IN Grade.grade%TYPE,
	sp_term        IN Grade.term%TYPE,
	sp_mem_id      IN Grade.mem_id%TYPE
) AS
BEGIN
	INSERT INTO Grade(grade_seq,grade,term,mem_id)
	VALUES(grade_seq.nextval,sp_grade,sp_term,sp_mem_id);
END insert_grade;
-- EXC_INSERT_GRADE
EXEC insert_grade('A','1-1','han');
/*
========== BOARD_NOTICE_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
DROP SEQUENCE art_seq;
CREATE SEQUENCE art_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
DROP TABLE Board CASCADE CONSTRAINT;
-- TABLE CREATE ORDER #4
CREATE TABLE Board(
  art_seq    INT CONSTRAINT board_pk PRIMARY KEY,
  category   VARCHAR2(20)  NOT NULL UNIQUE,
  title      VARCHAR2(30)  DEFAULT 'NO TITLE',
  reg_date   VARCHAR2(20)  NOT NULL,
  content    VARCHAR2(100) DEFAULT 'NO CONTENT',
  mem_id     VARCHAR2(20),
  CONSTRAINT member_board_fk FOREIGN KEY(mem_id)
	REFERENCES Member(mem_id) ON DELETE CASCADE
);
select *
from   board
;
CREATE OR REPLACE VIEW Board_view AS
SELECT u.mem_id AS id
      ,u.pw
      ,u.name
      ,u.reg_date AS regDate
      ,u.gender
      ,u.ssn
      ,u.profile_img AS profileImg
      ,u.email
      ,u.phone
      ,u.role
      ,substrb(u.ssn,1,6) birth
      ,b.art_seq AS artSeq
      ,b.content
      ,b.title
      ,b.reg_date AS writeDate
      ,b.category
FROM   member u
      ,board  b
WHERE  u.mem_id = b.mem_id
;
select *
from   Board_view;
-- SP_INSERT_NOTICE
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
-- EXC_INSERT_NOTICE
EXEC insert_notice('학교','의자좀 만들어주세요','2016-09-08','의자를 많이 만들어서 쉴수 있는공간 이있어야 합니다.');
/*
========== BOARD_QNA_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
-- SP_INSERT_QNA
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
-- EXC_INSERT_QNA
EXEC insert_qna('학점','학점이상해요','2016-09-08','1-1 JAVA 학점이 이상 해요.','han');
/*
========== SUBJECT_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
DROP SEQUENCE subj_seq;
CREATE SEQUENCE subj_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
DROP TABLE Subject CASCADE CONSTRAINT;
-- TABLE CREATE ORDER #5
CREATE TABLE Subject(
  subj_seq   INT CONSTRAINT subject_pk PRIMARY KEY,
  subj_name  VARCHAR2(20)  NOT NULL UNIQUE,
  mem_id     VARCHAR2(20)  NOT NULL,
  CONSTRAINT member_subject_fk FOREIGN KEY(mem_id)
	REFERENCES Member(mem_id) ON DELETE CASCADE
);
select *
from   Subject
;
CREATE OR REPLACE VIEW Subject_view AS
SELECT u.mem_id AS id
      ,u.pw
      ,u.name
      ,u.reg_date AS regDate
      ,u.gender
      ,u.ssn
      ,u.profile_img AS profileImg
      ,u.email
      ,u.phone
      ,u.role
      ,substrb(u.ssn,1,6) birth
      ,s.subj_seq AS subjSeq
      ,s.subj_name AS subjName
FROM   member  u
      ,subject s
WHERE  u.mem_id = s.mem_id
;
select *
from   Subject_view
;
-- SP_INSERT_SUBJECT
CREATE OR REPLACE PROCEDURE insert_subject(
	sp_subj_name IN Subject.subj_name%TYPE,
	sp_mem_id    IN Subject.mem_id%TYPE
) AS
BEGIN
	INSERT INTO Subject(subj_seq,subj_name,mem_id)
	VALUES(subj_seq.nextval,sp_subj_name,sp_mem_id);
END insert_subject;
-- EXC_INSERT_PROFESSOR
EXEC insert_subject('JAVA','haesu');
/*
========== EXAM_GROUP =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
DROP SEQUENCE exam_seq;
CREATE SEQUENCE exam_seq START WITH 1000 INCREMENT BY 1 NOCACHE NOCYCLE;
DROP TABLE Exam CASCADE CONSTRAINT;
-- TABLE CREATE ORDER #6
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
select *
from   exam
;
-- SP_INSERT_EXAM
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
-- EXC_INSERT_EXAM
EXEC insert_exam('1-1','95',1000,'han');



/*
========== MEMBER_ID_SEARCH =========
@AUTHOR : ckan2010@gmail.com
@CREATE : 2016-09-08
@UPDATE : 2016-09-09
@DESC   : 전공
=====================================
*/
-- SP_INSERT_PROFESSOR
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
       sp_result := '멤버 ID : '||sp_mem_id||', 비번 : '||sp_pw||', 이름 : '||sp_name||
                    ', 성별 : '||sp_gender||', 입학일자 : '||sp_reg_date||', SSN : '||sp_ssn||
                    ', 이메일 : '||sp_email||', 사진 : '||sp_profile_img||', 권한 : '||sp_role||
                    ', 전화번호 : '||sp_phone||', 전공순서 : '||sp_major_seq;
    ELSE
    
       sp_result := sp_mem_id||' 멤버가 없습니다';
       
    END IF;
    
END find_by_id;
-- EXC_INSERT_PROFESSOR
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

ALTER TABLE MAJOR MODIFY TITLE VARCHAR2(20) UNIQUE;

ALTER TABLE Member MODIFY ssn VARCHAR2(10) UNIQUE;

ALTER TABLE Member MODIFY phone VARCHAR2(13) UNIQUE;

ALTER TABLE Board MODIFY category VARCHAR2(10) UNIQUE;

ALTER TABLE Subject MODIFY subj_name VARCHAR2(20) UNIQUE;