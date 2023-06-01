create or replace directory temp_dir as 'C:\temp'
/

grant read, write on directory temp_dir to RECORDS;
/