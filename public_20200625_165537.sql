--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 12rc1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: analytics_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE analytics_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


ALTER DATABASE analytics_db OWNER TO postgres;

\connect analytics_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO postgres;

--
-- Name: corsheaders_corsmodel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.corsheaders_corsmodel (
    id integer NOT NULL,
    cors character varying(255) NOT NULL
);


ALTER TABLE public.corsheaders_corsmodel OWNER TO postgres;

--
-- Name: corsheaders_corsmodel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.corsheaders_corsmodel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.corsheaders_corsmodel_id_seq OWNER TO postgres;

--
-- Name: corsheaders_corsmodel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.corsheaders_corsmodel_id_seq OWNED BY public.corsheaders_corsmodel.id;


--
-- Name: dataprocessing_domain; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dataprocessing_domain (
    id integer NOT NULL,
    name character varying(200) NOT NULL
);


ALTER TABLE public.dataprocessing_domain OWNER TO postgres;

--
-- Name: dataprocessing_domain_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dataprocessing_domain_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dataprocessing_domain_id_seq OWNER TO postgres;

--
-- Name: dataprocessing_domain_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dataprocessing_domain_id_seq OWNED BY public.dataprocessing_domain.id;


--
-- Name: dataprocessing_domain_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dataprocessing_domain_user (
    id integer NOT NULL,
    domain_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.dataprocessing_domain_user OWNER TO postgres;

--
-- Name: dataprocessing_domain_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dataprocessing_domain_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dataprocessing_domain_user_id_seq OWNER TO postgres;

--
-- Name: dataprocessing_domain_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dataprocessing_domain_user_id_seq OWNED BY public.dataprocessing_domain_user.id;


--
-- Name: dataprocessing_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dataprocessing_items (
    id integer NOT NULL,
    name character varying(200) NOT NULL,
    value integer,
    source character varying(200) NOT NULL,
    author_id integer,
    domain_id integer
);


ALTER TABLE public.dataprocessing_items OWNER TO postgres;

--
-- Name: dataprocessing_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dataprocessing_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dataprocessing_items_id_seq OWNER TO postgres;

--
-- Name: dataprocessing_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dataprocessing_items_id_seq OWNED BY public.dataprocessing_items.id;


--
-- Name: dataprocessing_relation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dataprocessing_relation (
    id integer NOT NULL,
    relation character varying(10) NOT NULL,
    item1_id integer NOT NULL,
    count integer,
    item2_id integer NOT NULL
);


ALTER TABLE public.dataprocessing_relation OWNER TO postgres;

--
-- Name: dataprocessing_relation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dataprocessing_relation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dataprocessing_relation_id_seq OWNER TO postgres;

--
-- Name: dataprocessing_relation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dataprocessing_relation_id_seq OWNED BY public.dataprocessing_relation.id;


--
-- Name: dataprocessing_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dataprocessing_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    patronymic character varying(1024),
    isu_number character varying(1024)
);


ALTER TABLE public.dataprocessing_user OWNER TO postgres;

--
-- Name: dataprocessing_user_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dataprocessing_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.dataprocessing_user_groups OWNER TO postgres;

--
-- Name: dataprocessing_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dataprocessing_user_groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dataprocessing_user_groups_id_seq OWNER TO postgres;

--
-- Name: dataprocessing_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dataprocessing_user_groups_id_seq OWNED BY public.dataprocessing_user_groups.id;


--
-- Name: dataprocessing_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dataprocessing_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dataprocessing_user_id_seq OWNER TO postgres;

--
-- Name: dataprocessing_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dataprocessing_user_id_seq OWNED BY public.dataprocessing_user.id;


--
-- Name: dataprocessing_user_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dataprocessing_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.dataprocessing_user_user_permissions OWNER TO postgres;

--
-- Name: dataprocessing_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dataprocessing_user_user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dataprocessing_user_user_permissions_id_seq OWNER TO postgres;

--
-- Name: dataprocessing_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dataprocessing_user_user_permissions_id_seq OWNED BY public.dataprocessing_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id integer NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: django_summernote_attachment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_summernote_attachment (
    id integer NOT NULL,
    name character varying(255),
    file character varying(100) NOT NULL,
    uploaded timestamp with time zone NOT NULL
);


ALTER TABLE public.django_summernote_attachment OWNER TO postgres;

--
-- Name: django_summernote_attachment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.django_summernote_attachment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_summernote_attachment_id_seq OWNER TO postgres;

--
-- Name: django_summernote_attachment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.django_summernote_attachment_id_seq OWNED BY public.django_summernote_attachment.id;


--
-- Name: workprogramsapp_academicplan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_academicplan (
    id integer NOT NULL,
    educational_profile character varying(1024),
    approval_date timestamp with time zone,
    number character varying(1024)
);


ALTER TABLE public.workprogramsapp_academicplan OWNER TO postgres;

--
-- Name: workprogramsapp_academicplan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_academicplan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_academicplan_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_academicplan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_academicplan_id_seq OWNED BY public.workprogramsapp_academicplan.id;


--
-- Name: workprogramsapp_bibliographicreference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_bibliographicreference (
    id integer NOT NULL,
    description character varying(5000)
);


ALTER TABLE public.workprogramsapp_bibliographicreference OWNER TO postgres;

--
-- Name: workprogramsapp_bibliographicreference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_bibliographicreference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_bibliographicreference_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_bibliographicreference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_bibliographicreference_id_seq OWNED BY public.workprogramsapp_bibliographicreference.id;


--
-- Name: workprogramsapp_certification; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_certification (
    id integer NOT NULL,
    type character varying(1024) NOT NULL,
    semestr integer,
    description character varying(1024),
    deadline integer,
    work_program_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_certification OWNER TO postgres;

--
-- Name: workprogramsapp_certification_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_certification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_certification_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_certification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_certification_id_seq OWNED BY public.workprogramsapp_certification.id;


--
-- Name: workprogramsapp_competence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_competence (
    id integer NOT NULL,
    number character varying(1024) NOT NULL,
    name character varying(1024) NOT NULL
);


ALTER TABLE public.workprogramsapp_competence OWNER TO postgres;

--
-- Name: workprogramsapp_competence_field_of_study; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_competence_field_of_study (
    id integer NOT NULL,
    competence_id integer NOT NULL,
    fieldofstudy_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_competence_field_of_study OWNER TO postgres;

--
-- Name: workprogramsapp_competence_field_of_study_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_competence_field_of_study_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_competence_field_of_study_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_competence_field_of_study_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_competence_field_of_study_id_seq OWNED BY public.workprogramsapp_competence_field_of_study.id;


--
-- Name: workprogramsapp_competence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_competence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_competence_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_competence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_competence_id_seq OWNED BY public.workprogramsapp_competence.id;


--
-- Name: workprogramsapp_competence_work_program; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_competence_work_program (
    id integer NOT NULL,
    competence_id integer NOT NULL,
    workprogram_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_competence_work_program OWNER TO postgres;

--
-- Name: workprogramsapp_competence_work_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_competence_work_program_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_competence_work_program_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_competence_work_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_competence_work_program_id_seq OWNED BY public.workprogramsapp_competence_work_program.id;


--
-- Name: workprogramsapp_disciplineblock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_disciplineblock (
    id integer NOT NULL,
    name character varying(1024) NOT NULL,
    academic_plan_id integer
);


ALTER TABLE public.workprogramsapp_disciplineblock OWNER TO postgres;

--
-- Name: workprogramsapp_disciplineblock_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_disciplineblock_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_disciplineblock_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_disciplineblock_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_disciplineblock_id_seq OWNED BY public.workprogramsapp_disciplineblock.id;


--
-- Name: workprogramsapp_disciplineblockmodule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_disciplineblockmodule (
    id integer NOT NULL,
    name character varying(1024) NOT NULL,
    descipline_block_id integer
);


ALTER TABLE public.workprogramsapp_disciplineblockmodule OWNER TO postgres;

--
-- Name: workprogramsapp_disciplineblockmodule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_disciplineblockmodule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_disciplineblockmodule_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_disciplineblockmodule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_disciplineblockmodule_id_seq OWNED BY public.workprogramsapp_disciplineblockmodule.id;


--
-- Name: workprogramsapp_disciplinesection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_disciplinesection (
    id integer NOT NULL,
    name character varying(1024) NOT NULL,
    work_program_id integer NOT NULL,
    "SRO" integer,
    contact_work integer,
    laboratory integer,
    lecture_classes integer,
    practical_lessons integer,
    total_hours integer,
    ordinal_number integer NOT NULL
);


ALTER TABLE public.workprogramsapp_disciplinesection OWNER TO postgres;

--
-- Name: workprogramsapp_disciplinesection_evaluation_tools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_disciplinesection_evaluation_tools (
    id integer NOT NULL,
    disciplinesection_id integer NOT NULL,
    evaluationtool_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_disciplinesection_evaluation_tools OWNER TO postgres;

--
-- Name: workprogramsapp_disciplinesection_evaluation_tools_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_disciplinesection_evaluation_tools_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_disciplinesection_evaluation_tools_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_disciplinesection_evaluation_tools_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_disciplinesection_evaluation_tools_id_seq OWNED BY public.workprogramsapp_disciplinesection_evaluation_tools.id;


--
-- Name: workprogramsapp_disciplinesection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_disciplinesection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_disciplinesection_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_disciplinesection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_disciplinesection_id_seq OWNED BY public.workprogramsapp_disciplinesection.id;


--
-- Name: workprogramsapp_evaluationtool; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_evaluationtool (
    id integer NOT NULL,
    type character varying(1024) NOT NULL,
    name character varying(1024) NOT NULL,
    description character varying(50000),
    check_point boolean,
    deadline integer,
    max integer,
    min integer
);


ALTER TABLE public.workprogramsapp_evaluationtool OWNER TO postgres;

--
-- Name: workprogramsapp_evaluationtool_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_evaluationtool_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_evaluationtool_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_evaluationtool_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_evaluationtool_id_seq OWNED BY public.workprogramsapp_evaluationtool.id;


--
-- Name: workprogramsapp_fieldofstudy; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_fieldofstudy (
    id integer NOT NULL,
    number character varying(1024) NOT NULL,
    qualification character varying(1024),
    education_form character varying(1024),
    educational_profile character varying(1024),
    title character varying(1024),
    faculty character varying(150)
);


ALTER TABLE public.workprogramsapp_fieldofstudy OWNER TO postgres;

--
-- Name: workprogramsapp_fieldofstudy_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_fieldofstudy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_fieldofstudy_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_fieldofstudy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_fieldofstudy_id_seq OWNED BY public.workprogramsapp_fieldofstudy.id;


--
-- Name: workprogramsapp_fieldofstudyworkprogram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_fieldofstudyworkprogram (
    id integer NOT NULL,
    field_of_study_id integer NOT NULL,
    work_program_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_fieldofstudyworkprogram OWNER TO postgres;

--
-- Name: workprogramsapp_fieldofstudyworkprogram_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_fieldofstudyworkprogram_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_fieldofstudyworkprogram_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_fieldofstudyworkprogram_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_fieldofstudyworkprogram_id_seq OWNED BY public.workprogramsapp_fieldofstudyworkprogram.id;


--
-- Name: workprogramsapp_implementationacademicplan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_implementationacademicplan (
    id integer NOT NULL,
    year integer NOT NULL,
    academic_plan_id integer NOT NULL,
    field_of_study_id integer NOT NULL,
    CONSTRAINT workprogramsapp_implementationacademicplan_year_check CHECK ((year >= 0))
);


ALTER TABLE public.workprogramsapp_implementationacademicplan OWNER TO postgres;

--
-- Name: workprogramsapp_implementationacademicplan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_implementationacademicplan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_implementationacademicplan_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_implementationacademicplan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_implementationacademicplan_id_seq OWNED BY public.workprogramsapp_implementationacademicplan.id;


--
-- Name: workprogramsapp_indicator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_indicator (
    id integer NOT NULL,
    number character varying(1024) NOT NULL,
    name character varying(1024) NOT NULL,
    competence_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_indicator OWNER TO postgres;

--
-- Name: workprogramsapp_indicator_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_indicator_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_indicator_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_indicator_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_indicator_id_seq OWNED BY public.workprogramsapp_indicator.id;


--
-- Name: workprogramsapp_indicatorworkprogram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_indicatorworkprogram (
    id integer NOT NULL,
    knowledge character varying(1024) NOT NULL,
    skills character varying(1024) NOT NULL,
    proficiency character varying(1024) NOT NULL,
    indicator_id integer NOT NULL,
    work_program_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_indicatorworkprogram OWNER TO postgres;

--
-- Name: workprogramsapp_indicatorworkprogram_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_indicatorworkprogram_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_indicatorworkprogram_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_indicatorworkprogram_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_indicatorworkprogram_id_seq OWNED BY public.workprogramsapp_indicatorworkprogram.id;


--
-- Name: workprogramsapp_onlinecourse; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_onlinecourse (
    id integer NOT NULL,
    title character varying(512) NOT NULL,
    platform character varying(512),
    description character varying(50000),
    course_url character varying(200) NOT NULL
);


ALTER TABLE public.workprogramsapp_onlinecourse OWNER TO postgres;

--
-- Name: workprogramsapp_onlinecourse_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_onlinecourse_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_onlinecourse_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_onlinecourse_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_onlinecourse_id_seq OWNED BY public.workprogramsapp_onlinecourse.id;


--
-- Name: workprogramsapp_outcomesofworkprogram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_outcomesofworkprogram (
    id integer NOT NULL,
    masterylevel character varying(1) NOT NULL,
    item_id integer NOT NULL,
    workprogram_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_outcomesofworkprogram OWNER TO postgres;

--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_outcomesofworkprogram_evaluation_tool (
    id integer NOT NULL,
    outcomesofworkprogram_id integer NOT NULL,
    evaluationtool_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_outcomesofworkprogram_evaluation_tool OWNER TO postgres;

--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq OWNED BY public.workprogramsapp_outcomesofworkprogram_evaluation_tool.id;


--
-- Name: workprogramsapp_outcomesofworkprogram_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_outcomesofworkprogram_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_outcomesofworkprogram_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_outcomesofworkprogram_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_outcomesofworkprogram_id_seq OWNED BY public.workprogramsapp_outcomesofworkprogram.id;


--
-- Name: workprogramsapp_prerequisitesofworkprogram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_prerequisitesofworkprogram (
    id integer NOT NULL,
    masterylevel character varying(1) NOT NULL,
    item_id integer NOT NULL,
    workprogram_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_prerequisitesofworkprogram OWNER TO postgres;

--
-- Name: workprogramsapp_prerequisitesofworkprogram_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_prerequisitesofworkprogram_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_prerequisitesofworkprogram_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_prerequisitesofworkprogram_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_prerequisitesofworkprogram_id_seq OWNED BY public.workprogramsapp_prerequisitesofworkprogram.id;


--
-- Name: workprogramsapp_route; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_route (
    id integer NOT NULL,
    field_of_study_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_route OWNER TO postgres;

--
-- Name: workprogramsapp_route_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_route_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_route_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_route_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_route_id_seq OWNED BY public.workprogramsapp_route.id;


--
-- Name: workprogramsapp_routecomposition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_routecomposition (
    id integer NOT NULL,
    semester smallint NOT NULL,
    field_of_study_id integer NOT NULL,
    route_id integer NOT NULL,
    user_id integer NOT NULL,
    work_program_id integer NOT NULL,
    CONSTRAINT workprogramsapp_routecomposition_semester_check CHECK ((semester >= 0))
);


ALTER TABLE public.workprogramsapp_routecomposition OWNER TO postgres;

--
-- Name: workprogramsapp_routecomposition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_routecomposition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_routecomposition_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_routecomposition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_routecomposition_id_seq OWNED BY public.workprogramsapp_routecomposition.id;


--
-- Name: workprogramsapp_topic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_topic (
    id integer NOT NULL,
    number integer NOT NULL,
    description character varying(1024),
    discipline_section_id integer NOT NULL,
    url_online_course_id integer
);


ALTER TABLE public.workprogramsapp_topic OWNER TO postgres;

--
-- Name: workprogramsapp_topic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_topic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_topic_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_topic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_topic_id_seq OWNED BY public.workprogramsapp_topic.id;


--
-- Name: workprogramsapp_workprogram; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_workprogram (
    id integer NOT NULL,
    title character varying(1024) NOT NULL,
    "hoursFirstSemester" integer,
    "hoursSecondSemester" integer,
    qualification character varying(1024),
    discipline_code character varying(1024),
    approval_date timestamp with time zone,
    authors character varying(1024),
    description character varying(5000),
    video character varying(1024)
);


ALTER TABLE public.workprogramsapp_workprogram OWNER TO postgres;

--
-- Name: workprogramsapp_workprogram_bibliographic_reference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_workprogram_bibliographic_reference (
    id integer NOT NULL,
    workprogram_id integer NOT NULL,
    bibliographicreference_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_workprogram_bibliographic_reference OWNER TO postgres;

--
-- Name: workprogramsapp_workprogram_bibliographic_reference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_workprogram_bibliographic_reference_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_workprogram_bibliographic_reference_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_workprogram_bibliographic_reference_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_workprogram_bibliographic_reference_id_seq OWNED BY public.workprogramsapp_workprogram_bibliographic_reference.id;


--
-- Name: workprogramsapp_workprogram_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_workprogram_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_workprogram_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_workprogram_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_workprogram_id_seq OWNED BY public.workprogramsapp_workprogram.id;


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc (
    id integer NOT NULL,
    workprogramchangeindisciplineblockmodule_id integer NOT NULL,
    workprogram_id integer NOT NULL
);


ALTER TABLE public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc OWNER TO postgres;

--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1 OWNER TO postgres;

--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1 OWNED BY public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc.id;


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workprogramsapp_workprogramchangeindisciplineblockmodule (
    id integer NOT NULL,
    discipline_block_module_id integer,
    change_type character varying(1024),
    semester_hour character varying(1024),
    credit_units character varying(1024),
    code character varying(1024)
);


ALTER TABLE public.workprogramsapp_workprogramchangeindisciplineblockmodule OWNER TO postgres;

--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq OWNER TO postgres;

--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq OWNED BY public.workprogramsapp_workprogramchangeindisciplineblockmodule.id;


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: corsheaders_corsmodel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corsheaders_corsmodel ALTER COLUMN id SET DEFAULT nextval('public.corsheaders_corsmodel_id_seq'::regclass);


--
-- Name: dataprocessing_domain id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_domain ALTER COLUMN id SET DEFAULT nextval('public.dataprocessing_domain_id_seq'::regclass);


--
-- Name: dataprocessing_domain_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_domain_user ALTER COLUMN id SET DEFAULT nextval('public.dataprocessing_domain_user_id_seq'::regclass);


--
-- Name: dataprocessing_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_items ALTER COLUMN id SET DEFAULT nextval('public.dataprocessing_items_id_seq'::regclass);


--
-- Name: dataprocessing_relation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_relation ALTER COLUMN id SET DEFAULT nextval('public.dataprocessing_relation_id_seq'::regclass);


--
-- Name: dataprocessing_user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user ALTER COLUMN id SET DEFAULT nextval('public.dataprocessing_user_id_seq'::regclass);


--
-- Name: dataprocessing_user_groups id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_groups ALTER COLUMN id SET DEFAULT nextval('public.dataprocessing_user_groups_id_seq'::regclass);


--
-- Name: dataprocessing_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.dataprocessing_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: django_summernote_attachment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_summernote_attachment ALTER COLUMN id SET DEFAULT nextval('public.django_summernote_attachment_id_seq'::regclass);


--
-- Name: workprogramsapp_academicplan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_academicplan ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_academicplan_id_seq'::regclass);


--
-- Name: workprogramsapp_bibliographicreference id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_bibliographicreference ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_bibliographicreference_id_seq'::regclass);


--
-- Name: workprogramsapp_certification id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_certification ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_certification_id_seq'::regclass);


--
-- Name: workprogramsapp_competence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_competence_id_seq'::regclass);


--
-- Name: workprogramsapp_competence_field_of_study id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_field_of_study ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_competence_field_of_study_id_seq'::regclass);


--
-- Name: workprogramsapp_competence_work_program id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_work_program ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_competence_work_program_id_seq'::regclass);


--
-- Name: workprogramsapp_disciplineblock id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplineblock ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_disciplineblock_id_seq'::regclass);


--
-- Name: workprogramsapp_disciplineblockmodule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplineblockmodule ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_disciplineblockmodule_id_seq'::regclass);


--
-- Name: workprogramsapp_disciplinesection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_disciplinesection_id_seq'::regclass);


--
-- Name: workprogramsapp_disciplinesection_evaluation_tools id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection_evaluation_tools ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_disciplinesection_evaluation_tools_id_seq'::regclass);


--
-- Name: workprogramsapp_evaluationtool id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_evaluationtool ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_evaluationtool_id_seq'::regclass);


--
-- Name: workprogramsapp_fieldofstudy id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudy ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_fieldofstudy_id_seq'::regclass);


--
-- Name: workprogramsapp_fieldofstudyworkprogram id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudyworkprogram ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_fieldofstudyworkprogram_id_seq'::regclass);


--
-- Name: workprogramsapp_implementationacademicplan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_implementationacademicplan ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_implementationacademicplan_id_seq'::regclass);


--
-- Name: workprogramsapp_indicator id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicator ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_indicator_id_seq'::regclass);


--
-- Name: workprogramsapp_indicatorworkprogram id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicatorworkprogram ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_indicatorworkprogram_id_seq'::regclass);


--
-- Name: workprogramsapp_onlinecourse id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_onlinecourse ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_onlinecourse_id_seq'::regclass);


--
-- Name: workprogramsapp_outcomesofworkprogram id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_outcomesofworkprogram_id_seq'::regclass);


--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram_evaluation_tool ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq'::regclass);


--
-- Name: workprogramsapp_prerequisitesofworkprogram id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_prerequisitesofworkprogram ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_prerequisitesofworkprogram_id_seq'::regclass);


--
-- Name: workprogramsapp_route id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_route ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_route_id_seq'::regclass);


--
-- Name: workprogramsapp_routecomposition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_routecomposition ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_routecomposition_id_seq'::regclass);


--
-- Name: workprogramsapp_topic id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_topic ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_topic_id_seq'::regclass);


--
-- Name: workprogramsapp_workprogram id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogram ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_workprogram_id_seq'::regclass);


--
-- Name: workprogramsapp_workprogram_bibliographic_reference id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogram_bibliographic_reference ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_workprogram_bibliographic_reference_id_seq'::regclass);


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq'::regclass);


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc ALTER COLUMN id SET DEFAULT nextval('public.workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1'::regclass);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.auth_permission VALUES (1, 'Can add log entry', 1, 'add_logentry');
INSERT INTO public.auth_permission VALUES (2, 'Can change log entry', 1, 'change_logentry');
INSERT INTO public.auth_permission VALUES (3, 'Can delete log entry', 1, 'delete_logentry');
INSERT INTO public.auth_permission VALUES (4, 'Can view log entry', 1, 'view_logentry');
INSERT INTO public.auth_permission VALUES (5, 'Can add permission', 2, 'add_permission');
INSERT INTO public.auth_permission VALUES (6, 'Can change permission', 2, 'change_permission');
INSERT INTO public.auth_permission VALUES (7, 'Can delete permission', 2, 'delete_permission');
INSERT INTO public.auth_permission VALUES (8, 'Can view permission', 2, 'view_permission');
INSERT INTO public.auth_permission VALUES (9, 'Can add group', 3, 'add_group');
INSERT INTO public.auth_permission VALUES (10, 'Can change group', 3, 'change_group');
INSERT INTO public.auth_permission VALUES (11, 'Can delete group', 3, 'delete_group');
INSERT INTO public.auth_permission VALUES (12, 'Can view group', 3, 'view_group');
INSERT INTO public.auth_permission VALUES (13, 'Can add content type', 4, 'add_contenttype');
INSERT INTO public.auth_permission VALUES (14, 'Can change content type', 4, 'change_contenttype');
INSERT INTO public.auth_permission VALUES (15, 'Can delete content type', 4, 'delete_contenttype');
INSERT INTO public.auth_permission VALUES (16, 'Can view content type', 4, 'view_contenttype');
INSERT INTO public.auth_permission VALUES (17, 'Can add session', 5, 'add_session');
INSERT INTO public.auth_permission VALUES (18, 'Can change session', 5, 'change_session');
INSERT INTO public.auth_permission VALUES (19, 'Can delete session', 5, 'delete_session');
INSERT INTO public.auth_permission VALUES (20, 'Can view session', 5, 'view_session');
INSERT INTO public.auth_permission VALUES (21, 'Can add user', 6, 'add_user');
INSERT INTO public.auth_permission VALUES (22, 'Can change user', 6, 'change_user');
INSERT INTO public.auth_permission VALUES (23, 'Can delete user', 6, 'delete_user');
INSERT INTO public.auth_permission VALUES (24, 'Can view user', 6, 'view_user');
INSERT INTO public.auth_permission VALUES (25, 'Can add domain', 7, 'add_domain');
INSERT INTO public.auth_permission VALUES (26, 'Can change domain', 7, 'change_domain');
INSERT INTO public.auth_permission VALUES (27, 'Can delete domain', 7, 'delete_domain');
INSERT INTO public.auth_permission VALUES (28, 'Can view domain', 7, 'view_domain');
INSERT INTO public.auth_permission VALUES (29, 'Can add items', 8, 'add_items');
INSERT INTO public.auth_permission VALUES (30, 'Can change items', 8, 'change_items');
INSERT INTO public.auth_permission VALUES (31, 'Can delete items', 8, 'delete_items');
INSERT INTO public.auth_permission VALUES (32, 'Can view items', 8, 'view_items');
INSERT INTO public.auth_permission VALUES (33, 'Can add relation', 9, 'add_relation');
INSERT INTO public.auth_permission VALUES (34, 'Can change relation', 9, 'change_relation');
INSERT INTO public.auth_permission VALUES (35, 'Can delete relation', 9, 'delete_relation');
INSERT INTO public.auth_permission VALUES (36, 'Can view relation', 9, 'view_relation');
INSERT INTO public.auth_permission VALUES (37, 'Can add attachment', 10, 'add_attachment');
INSERT INTO public.auth_permission VALUES (38, 'Can change attachment', 10, 'change_attachment');
INSERT INTO public.auth_permission VALUES (39, 'Can delete attachment', 10, 'delete_attachment');
INSERT INTO public.auth_permission VALUES (40, 'Can view attachment', 10, 'view_attachment');
INSERT INTO public.auth_permission VALUES (41, 'Can add Token', 11, 'add_token');
INSERT INTO public.auth_permission VALUES (42, 'Can change Token', 11, 'change_token');
INSERT INTO public.auth_permission VALUES (43, 'Can delete Token', 11, 'delete_token');
INSERT INTO public.auth_permission VALUES (44, 'Can view Token', 11, 'view_token');
INSERT INTO public.auth_permission VALUES (45, 'Can add cors model', 12, 'add_corsmodel');
INSERT INTO public.auth_permission VALUES (46, 'Can change cors model', 12, 'change_corsmodel');
INSERT INTO public.auth_permission VALUES (47, 'Can delete cors model', 12, 'delete_corsmodel');
INSERT INTO public.auth_permission VALUES (48, 'Can view cors model', 12, 'view_corsmodel');
INSERT INTO public.auth_permission VALUES (49, 'Can add competence', 13, 'add_competence');
INSERT INTO public.auth_permission VALUES (50, 'Can change competence', 13, 'change_competence');
INSERT INTO public.auth_permission VALUES (51, 'Can delete competence', 13, 'delete_competence');
INSERT INTO public.auth_permission VALUES (52, 'Can view competence', 13, 'view_competence');
INSERT INTO public.auth_permission VALUES (53, 'Can add discipline section', 14, 'add_disciplinesection');
INSERT INTO public.auth_permission VALUES (54, 'Can change discipline section', 14, 'change_disciplinesection');
INSERT INTO public.auth_permission VALUES (55, 'Can delete discipline section', 14, 'delete_disciplinesection');
INSERT INTO public.auth_permission VALUES (56, 'Can view discipline section', 14, 'view_disciplinesection');
INSERT INTO public.auth_permission VALUES (57, 'Can add evaluation tool', 15, 'add_evaluationtool');
INSERT INTO public.auth_permission VALUES (58, 'Can change evaluation tool', 15, 'change_evaluationtool');
INSERT INTO public.auth_permission VALUES (59, 'Can delete evaluation tool', 15, 'delete_evaluationtool');
INSERT INTO public.auth_permission VALUES (60, 'Can view evaluation tool', 15, 'view_evaluationtool');
INSERT INTO public.auth_permission VALUES (61, 'Can add field of study', 16, 'add_fieldofstudy');
INSERT INTO public.auth_permission VALUES (62, 'Can change field of study', 16, 'change_fieldofstudy');
INSERT INTO public.auth_permission VALUES (63, 'Can delete field of study', 16, 'delete_fieldofstudy');
INSERT INTO public.auth_permission VALUES (64, 'Can view field of study', 16, 'view_fieldofstudy');
INSERT INTO public.auth_permission VALUES (65, 'Can add field of study work program', 17, 'add_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (66, 'Can change field of study work program', 17, 'change_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (67, 'Can delete field of study work program', 17, 'delete_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (68, 'Can view field of study work program', 17, 'view_fieldofstudyworkprogram');
INSERT INTO public.auth_permission VALUES (69, 'Can add indicator', 18, 'add_indicator');
INSERT INTO public.auth_permission VALUES (70, 'Can change indicator', 18, 'change_indicator');
INSERT INTO public.auth_permission VALUES (71, 'Can delete indicator', 18, 'delete_indicator');
INSERT INTO public.auth_permission VALUES (72, 'Can view indicator', 18, 'view_indicator');
INSERT INTO public.auth_permission VALUES (73, 'Can add outcomes of work program', 19, 'add_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (74, 'Can change outcomes of work program', 19, 'change_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (75, 'Can delete outcomes of work program', 19, 'delete_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (76, 'Can view outcomes of work program', 19, 'view_outcomesofworkprogram');
INSERT INTO public.auth_permission VALUES (77, 'Can add prerequisites of work program', 20, 'add_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (78, 'Can change prerequisites of work program', 20, 'change_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (79, 'Can delete prerequisites of work program', 20, 'delete_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (80, 'Can view prerequisites of work program', 20, 'view_prerequisitesofworkprogram');
INSERT INTO public.auth_permission VALUES (81, 'Can add route', 21, 'add_route');
INSERT INTO public.auth_permission VALUES (82, 'Can change route', 21, 'change_route');
INSERT INTO public.auth_permission VALUES (83, 'Can delete route', 21, 'delete_route');
INSERT INTO public.auth_permission VALUES (84, 'Can view route', 21, 'view_route');
INSERT INTO public.auth_permission VALUES (85, 'Can add work program', 22, 'add_workprogram');
INSERT INTO public.auth_permission VALUES (86, 'Can change work program', 22, 'change_workprogram');
INSERT INTO public.auth_permission VALUES (87, 'Can delete work program', 22, 'delete_workprogram');
INSERT INTO public.auth_permission VALUES (88, 'Can view work program', 22, 'view_workprogram');
INSERT INTO public.auth_permission VALUES (89, 'Can add topic', 23, 'add_topic');
INSERT INTO public.auth_permission VALUES (90, 'Can change topic', 23, 'change_topic');
INSERT INTO public.auth_permission VALUES (91, 'Can delete topic', 23, 'delete_topic');
INSERT INTO public.auth_permission VALUES (92, 'Can view topic', 23, 'view_topic');
INSERT INTO public.auth_permission VALUES (93, 'Can add route composition', 24, 'add_routecomposition');
INSERT INTO public.auth_permission VALUES (94, 'Can change route composition', 24, 'change_routecomposition');
INSERT INTO public.auth_permission VALUES (95, 'Can delete route composition', 24, 'delete_routecomposition');
INSERT INTO public.auth_permission VALUES (96, 'Can view route composition', 24, 'view_routecomposition');
INSERT INTO public.auth_permission VALUES (97, 'Can add indicator work program', 25, 'add_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (98, 'Can change indicator work program', 25, 'change_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (99, 'Can delete indicator work program', 25, 'delete_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (100, 'Can view indicator work program', 25, 'view_indicatorworkprogram');
INSERT INTO public.auth_permission VALUES (101, 'Can add certification', 26, 'add_certification');
INSERT INTO public.auth_permission VALUES (102, 'Can change certification', 26, 'change_certification');
INSERT INTO public.auth_permission VALUES (103, 'Can delete certification', 26, 'delete_certification');
INSERT INTO public.auth_permission VALUES (104, 'Can view certification', 26, 'view_certification');
INSERT INTO public.auth_permission VALUES (105, 'Can add online course', 27, 'add_onlinecourse');
INSERT INTO public.auth_permission VALUES (106, 'Can change online course', 27, 'change_onlinecourse');
INSERT INTO public.auth_permission VALUES (107, 'Can delete online course', 27, 'delete_onlinecourse');
INSERT INTO public.auth_permission VALUES (108, 'Can view online course', 27, 'view_onlinecourse');
INSERT INTO public.auth_permission VALUES (109, 'Can add bibliographic reference', 28, 'add_bibliographicreference');
INSERT INTO public.auth_permission VALUES (110, 'Can change bibliographic reference', 28, 'change_bibliographicreference');
INSERT INTO public.auth_permission VALUES (111, 'Can delete bibliographic reference', 28, 'delete_bibliographicreference');
INSERT INTO public.auth_permission VALUES (112, 'Can view bibliographic reference', 28, 'view_bibliographicreference');
INSERT INTO public.auth_permission VALUES (117, 'Can add implementation academic plan', 30, 'add_implementationacademicplan');
INSERT INTO public.auth_permission VALUES (118, 'Can change implementation academic plan', 30, 'change_implementationacademicplan');
INSERT INTO public.auth_permission VALUES (119, 'Can delete implementation academic plan', 30, 'delete_implementationacademicplan');
INSERT INTO public.auth_permission VALUES (120, 'Can view implementation academic plan', 30, 'view_implementationacademicplan');
INSERT INTO public.auth_permission VALUES (121, 'Can add discipline block', 31, 'add_disciplineblock');
INSERT INTO public.auth_permission VALUES (122, 'Can change discipline block', 31, 'change_disciplineblock');
INSERT INTO public.auth_permission VALUES (123, 'Can delete discipline block', 31, 'delete_disciplineblock');
INSERT INTO public.auth_permission VALUES (124, 'Can view discipline block', 31, 'view_disciplineblock');
INSERT INTO public.auth_permission VALUES (125, 'Can add academic plan', 32, 'add_academicplan');
INSERT INTO public.auth_permission VALUES (126, 'Can change academic plan', 32, 'change_academicplan');
INSERT INTO public.auth_permission VALUES (127, 'Can delete academic plan', 32, 'delete_academicplan');
INSERT INTO public.auth_permission VALUES (128, 'Can view academic plan', 32, 'view_academicplan');
INSERT INTO public.auth_permission VALUES (129, 'Can add discipline block module', 33, 'add_disciplineblockmodule');
INSERT INTO public.auth_permission VALUES (130, 'Can change discipline block module', 33, 'change_disciplineblockmodule');
INSERT INTO public.auth_permission VALUES (131, 'Can delete discipline block module', 33, 'delete_disciplineblockmodule');
INSERT INTO public.auth_permission VALUES (132, 'Can view discipline block module', 33, 'view_disciplineblockmodule');
INSERT INTO public.auth_permission VALUES (133, 'Can add work program change in discipline block module', 34, 'add_workprogramchangeindisciplineblockmodule');
INSERT INTO public.auth_permission VALUES (134, 'Can change work program change in discipline block module', 34, 'change_workprogramchangeindisciplineblockmodule');
INSERT INTO public.auth_permission VALUES (135, 'Can delete work program change in discipline block module', 34, 'delete_workprogramchangeindisciplineblockmodule');
INSERT INTO public.auth_permission VALUES (136, 'Can view work program change in discipline block module', 34, 'view_workprogramchangeindisciplineblockmodule');


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.authtoken_token VALUES ('3efe42e295a5096da915473b002a60b01d600711', '2020-04-25 21:25:18.963104+00', 1);
INSERT INTO public.authtoken_token VALUES ('51c527aaeb3c66c5e6a7d5b14f1f81ff11c9ffd8', '2020-06-05 00:19:23.906353+00', 2);


--
-- Data for Name: corsheaders_corsmodel; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_domain; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_domain VALUES (8, 'Анализ данных');
INSERT INTO public.dataprocessing_domain VALUES (9, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (10, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (11, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (12, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (13, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (14, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (45, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (46, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (47, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (48, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (49, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (50, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (51, 'dfdfdf');
INSERT INTO public.dataprocessing_domain VALUES (52, 'dfdfdf');


--
-- Data for Name: dataprocessing_domain_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_domain_user VALUES (8, 8, 1);
INSERT INTO public.dataprocessing_domain_user VALUES (9, 51, 1);
INSERT INTO public.dataprocessing_domain_user VALUES (10, 52, 1);


--
-- Data for Name: dataprocessing_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_items VALUES (3, 'Алгебра', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (6, 'Обратная матрица', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (7, 'Элементарные преобразования матриц', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (8, 'Ранг матрицы', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (9, 'Системы линейных уравнений', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (10, 'Метод Крамера', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (11, 'Метод обратной матрицы', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (12, 'Метод Гаусса', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (13, 'Однородные системы линейных уравнений', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (14, 'Фундаментальная система решений', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (15, 'Геометрия', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (16, 'Вектор', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (17, 'Направляющие косинусы', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (18, 'Условие коллинеарности', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (19, 'Скалярное произведение векторов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (20, 'Условие ортогональности', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (21, 'Векторное произведение векторов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (22, 'Вычисление площади параллелограмма', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (23, 'Смешанное произведение векторов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (24, 'Объем параллелепипеда', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (25, 'Объем тетраэдра', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (26, 'Аналитическая геометрия', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (27, 'Системы координат на плоскости', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (28, 'Системы координат в пространстве', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (29, 'Преобразование координат', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (30, 'Линейные геометрические объекты', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (31, 'Алгебраические кривые второго порядка', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (32, 'Аналитическое задание кривых на плоскости', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (33, 'Аналитическое задание кривых в пространстве', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (34, 'Переход к параметрическому заданию', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (35, 'Кривые в полярных координатах', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (36, 'Поверхности второго порядка', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (37, 'Метод параллельных сечений', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (38, 'Приведение уравнения поверхности второго порядка к канонической форме', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (39, 'Линейное пространство и квадратичные формы', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (40, 'Линейное пространство', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (41, 'Евклидово пространство', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (42, 'Квадратичные формы второго порядка', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (43, 'Квадратичные поверхности второго порядка', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (44, 'Введение в матанализ', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (45, 'Теория пределов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (46, 'Множество', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (47, 'Числовое множество', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (48, 'Операции над множествами', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (49, 'Функция одной вещественной переменной', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (50, 'Предел функции одной переменной', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (51, 'Свойства пределов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (52, 'Вычисление пределов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (53, 'Непрерывная функция', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (54, 'Исследование функции на непрерывность и разрыв', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (55, 'Дифференциальное исчисление функции одной переменной', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (56, 'Производная', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (57, 'Дифференциал функции одной переменной первого порядка', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (58, 'Дифференциал функции одной переменной высшего порядка', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (59, 'Правила дифференцирования функций', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (60, 'Свойства дифференцируемых функций на отрезке', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (61, 'Исследование функции', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (62, 'Дифференциальное исчисление функции нескольких переменных', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (63, 'Функция нескольких переменных', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (64, 'Дифференцирование', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (65, 'Применение производных функции нескольких переменных к исследованию кривых и поверхностей', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (66, 'Интегрирование функции одной переменной', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (67, 'Неопределенный интеграл', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (68, 'Методы интегрирования', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (69, 'Интегрирование функций', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (70, 'Интегрирование тригонометрических выражений', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (71, 'Дифференциальные уравнения', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (5, 'Определитель', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (4, 'Матрица', 3, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (72, 'Обыкновенные дифференциальные уравнения (ОДУ)', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (73, 'Интегрируемые оду 1-го порядка', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (74, 'ДУ высших порядков', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (75, 'Линейные ДУ n-го порядка с постоянными коэффициентами', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (76, 'Системы линейных дифференциальных уравнений с постоянными коэффициентами', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (77, 'Определенные интегралы', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (78, 'Определенный интеграл', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (79, 'Вычисление определенного интеграла', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (80, 'Несобственные интегралы', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (81, 'Сходимость несобственных интегралов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (82, 'Кратные интегралы', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (83, 'Двойной интеграл', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (84, 'Вычисление двойного интеграла', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (85, 'Числовые и функциональные ряды', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (86, 'Числовые ряды', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (87, 'Сходимость числовых рядов', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (88, 'Функциональные ряды', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (89, 'Ряд Тейлора-Маклорена', 0, 'uploaded', 1, 8);
INSERT INTO public.dataprocessing_items VALUES (2, 'Математика', 3, 'uploaded', 1, 8);


--
-- Data for Name: dataprocessing_relation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_user VALUES (2, 'pbkdf2_sha256$150000$znphZ3OvjGl2$fRyl2kMTjPAI+8glNBeRWKybSztnEocnFd2PAj33Bu4=', '2020-06-05 00:19:23+00', false, 'so_user', '', '', '', true, true, '2020-06-04 23:05:59+00', NULL, NULL);
INSERT INTO public.dataprocessing_user VALUES (1, 'pbkdf2_sha256$150000$fXziYrLFD06X$PJG/csLzJUROFb5Rk8tXRWVbZhcUyOEwTgeeDNRfo/M=', '2020-06-08 22:17:50.058399+00', true, 'admin', '', '', 'admin@admin.ru', true, true, '2020-04-25 20:22:09.34016+00', NULL, NULL);


--
-- Data for Name: dataprocessing_user_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dataprocessing_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.dataprocessing_user_user_permissions VALUES (1, 2, 21);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (2, 2, 22);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (3, 2, 23);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (4, 2, 24);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (5, 2, 25);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (6, 2, 26);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (7, 2, 27);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (8, 2, 28);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (9, 2, 29);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (10, 2, 30);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (11, 2, 31);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (12, 2, 32);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (13, 2, 33);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (14, 2, 34);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (15, 2, 35);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (16, 2, 36);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (17, 2, 45);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (18, 2, 46);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (19, 2, 47);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (20, 2, 48);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (21, 2, 49);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (22, 2, 50);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (23, 2, 51);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (24, 2, 52);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (25, 2, 53);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (26, 2, 54);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (27, 2, 55);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (28, 2, 56);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (29, 2, 57);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (30, 2, 58);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (31, 2, 59);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (32, 2, 60);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (33, 2, 61);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (34, 2, 62);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (35, 2, 63);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (36, 2, 64);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (37, 2, 65);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (38, 2, 66);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (39, 2, 67);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (40, 2, 68);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (41, 2, 69);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (42, 2, 70);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (43, 2, 71);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (44, 2, 72);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (45, 2, 73);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (46, 2, 74);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (47, 2, 75);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (48, 2, 76);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (49, 2, 77);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (50, 2, 78);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (51, 2, 79);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (52, 2, 80);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (53, 2, 81);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (54, 2, 82);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (55, 2, 83);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (56, 2, 84);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (57, 2, 85);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (58, 2, 86);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (59, 2, 87);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (60, 2, 88);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (61, 2, 89);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (62, 2, 90);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (63, 2, 91);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (64, 2, 92);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (65, 2, 93);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (66, 2, 94);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (67, 2, 95);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (68, 2, 96);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (69, 2, 97);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (70, 2, 98);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (71, 2, 99);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (72, 2, 100);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (73, 2, 101);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (74, 2, 102);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (75, 2, 103);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (76, 2, 104);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (77, 2, 105);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (78, 2, 106);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (79, 2, 107);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (80, 2, 108);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (81, 2, 109);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (82, 2, 110);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (83, 2, 111);
INSERT INTO public.dataprocessing_user_user_permissions VALUES (84, 2, 112);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_admin_log VALUES (1, '2020-04-25 21:26:36.261503+00', '1', 'dgfdgdfg', 1, '[{"added": {}}]', 8, 1);
INSERT INTO public.django_admin_log VALUES (2, '2020-04-25 21:26:51.427812+00', '1', 'sfgfg', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (3, '2020-04-28 21:25:47.896578+00', '1', '09.04.03 Прикладная информатика', 1, '[{"added": {}}]', 16, 1);
INSERT INTO public.django_admin_log VALUES (4, '2020-04-28 21:27:22.916805+00', '2', 'Алгоритмы и структуры данных', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (5, '2020-04-28 21:27:57.491936+00', '1', 'Способен управлять аналитическими работами и работать со сложными структурами данных при решении практических задач программирования', 1, '[{"added": {}}]', 13, 1);
INSERT INTO public.django_admin_log VALUES (6, '2020-04-28 21:28:27.225629+00', '2', 'Способен собирать, обрабатывать с использованием современных информационных технологий и интерпретировать необходимые данные для формирования суждений по соответствующим социальным, научным и професси', 1, '[{"added": {}}]', 13, 1);
INSERT INTO public.django_admin_log VALUES (7, '2020-04-28 21:29:24.248889+00', '1', 'Разрабатывает технико-коммерческое предложение и участвует  в его защите', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (8, '2020-04-28 21:29:38.148374+00', '2', 'Разрабатывает методику выполнения аналитических работ и управляет аналитическими ресурсами и компетенциями', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (9, '2020-04-28 21:30:06.954245+00', '1', 'CompetenceIndicator object (1)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (10, '2020-04-28 21:30:13.387387+00', '2', 'CompetenceIndicator object (2)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (11, '2020-04-28 21:30:40.428965+00', '3', 'Выбирает методы и инструментальные средства для проведения аналитических работ', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (12, '2020-04-28 21:30:52.762104+00', '4', 'Разрабатывает и проводит оценку используемых моделей', 1, '[{"added": {}}]', 18, 1);
INSERT INTO public.django_admin_log VALUES (13, '2020-04-28 21:31:11.566587+00', '3', 'CompetenceIndicator object (3)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (14, '2020-04-28 21:31:19.528668+00', '4', 'CompetenceIndicator object (4)', 1, '[{"added": {}}]', 26, 1);
INSERT INTO public.django_admin_log VALUES (15, '2020-04-30 10:25:24.16382+00', '1', 'OutcomesOfWorkProgram object (1)', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (16, '2020-04-30 15:55:56.301777+00', '1', 'Основы построения и анализа алгоритмов', 1, '[{"added": {}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (17, '2020-04-30 15:56:10.134585+00', '2', 'Основные абстрактные типы данных', 1, '[{"added": {}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (18, '2020-04-30 15:58:34.176257+00', '1', 'Сравнительный анализ сложности и  времени выполнения алгоритмов', 1, '[{"added": {}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (19, '2020-04-30 15:59:00.071141+00', '2', 'Основные абстрактные типы данных', 1, '[{"added": {}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (20, '2020-04-30 15:59:22.402272+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (21, '2020-04-30 15:59:25.967236+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (22, '2020-04-30 18:09:58.343041+00', '3', 'OutcomesOfWorkProgram object (3)', 1, '[{"added": {}}]', 19, 1);
INSERT INTO public.django_admin_log VALUES (23, '2020-04-30 20:27:21.408757+00', '1', '1.1', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (24, '2020-05-04 12:08:32.081366+00', '1', 'Certification object (1)', 1, '[{"added": {}}]', 27, 1);
INSERT INTO public.django_admin_log VALUES (25, '2020-05-04 12:10:26.873363+00', '3', 'PrerequisitesOfWorkProgram object (3)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (26, '2020-05-04 12:16:07.55125+00', '2', 'Алгоритмы и структуры данных', 2, '[{"changed": {"fields": ["qualification"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (162, '2020-06-07 23:13:14.655082+00', '9', 'OnlineCourse object (9)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (27, '2020-05-04 12:29:44.869324+00', '2', 'Алгоритмы и структуры данных', 2, '[{"changed": {"fields": ["qualification"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (28, '2020-05-06 14:51:37.902824+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["contact_work", "lecture_classes", "SRO", "total_hours"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (29, '2020-05-06 14:51:47.04768+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["contact_work", "lecture_classes", "laboratory", "practical_lessons", "SRO", "total_hours"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (30, '2020-05-06 15:01:59.212061+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["laboratory", "practical_lessons"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (31, '2020-05-06 15:04:02.116469+00', '3', 'Красивый раздел для Полины', 1, '[{"added": {}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (32, '2020-05-06 16:17:08.436578+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (33, '2020-05-06 16:17:12.952333+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (34, '2020-05-07 14:28:09.361802+00', '2', '1Классная тема, Вы бы такими были', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (35, '2020-05-07 14:28:22.736565+00', '3', '2Тема огонь', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (36, '2020-05-07 14:29:43.407497+00', '4', '3Так себе тема', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (37, '2020-05-07 15:16:34.595787+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (38, '2020-05-07 15:17:40.757011+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (39, '2020-05-07 15:18:03.312556+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (40, '2020-05-07 15:18:10.445622+00', '1', 'Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (41, '2020-05-07 15:24:12.681578+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["name"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (42, '2020-05-07 15:24:18.627621+00', '2', 'Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (43, '2020-05-07 15:24:25.051248+00', '2', '2 Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["name"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (44, '2020-05-07 15:24:52.923588+00', '2', '2 Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (45, '2020-05-07 15:25:01.71721+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (46, '2020-05-07 15:25:39.349973+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (47, '2020-05-07 15:26:50.228826+00', '1', '1 Основы построения и анализа алгоритмов', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (48, '2020-05-07 15:26:53.816227+00', '2', '2 Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["ordinal_number"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (49, '2020-05-24 16:43:11.259262+00', '1', 'OnlineCourse object (1)', 1, '[{"added": {}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (72, '2020-06-02 14:57:37.370476+00', '3', 'Очень крутая рабочая программа', 2, '[{"changed": {"fields": ["bibliographic_reference"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (73, '2020-06-02 14:57:57.641511+00', '2', 'Название дисциплины', 2, '[{"changed": {"fields": ["bibliographic_reference"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (74, '2020-06-02 14:58:02.781163+00', '1', 'sfgfg', 2, '[{"changed": {"fields": ["bibliographic_reference"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (75, '2020-06-04 23:06:00.006554+00', '2', 'so_user', 1, '[{"added": {}}]', 6, 1);
INSERT INTO public.django_admin_log VALUES (76, '2020-06-05 12:49:48.282528+00', '2', 'so_user', 2, '[{"changed": {"fields": ["is_staff", "user_permissions"]}}]', 6, 1);
INSERT INTO public.django_admin_log VALUES (77, '2020-06-05 21:22:20.439221+00', '2', 'Математика', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (78, '2020-06-05 21:22:28.34102+00', '3', 'Физика', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (79, '2020-06-05 21:22:37.946126+00', '4', 'Машинное обучение', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (80, '2020-06-05 21:22:58.594198+00', '5', 'Полина тест))', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (81, '2020-06-06 17:21:41.680116+00', '4', 'PrerequisitesOfWorkProgram object (4)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (82, '2020-06-06 17:35:23.416919+00', '4', 'PrerequisitesOfWorkProgram object (4)', 2, '[{"changed": {"fields": ["workprogram"]}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (83, '2020-06-06 17:35:38.989458+00', '4', 'PrerequisitesOfWorkProgram object (4)', 2, '[{"changed": {"fields": ["workprogram"]}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (84, '2020-06-06 20:51:15.975762+00', '5', 'PrerequisitesOfWorkProgram object (5)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (85, '2020-06-06 20:51:38.306341+00', '6', 'PrerequisitesOfWorkProgram object (6)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (86, '2020-06-07 14:57:18.636468+00', '2', '2 Основные абстрактные типы данных', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (87, '2020-06-07 14:57:23.156579+00', '13', 'Классный раздел', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (88, '2020-06-07 16:25:26.128752+00', '5', 'Прикладная математика', 1, '[{"added": {}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (89, '2020-06-07 16:29:19.632035+00', '5', 'Прикладная математика', 2, '[{"changed": {"fields": ["discipline_code"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (90, '2020-06-07 16:37:54.636544+00', '7', 'Условность разделения математики на чистую и прикладную.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (91, '2020-06-07 16:38:13.8121+00', '8', 'Роль математического, информационного и компьютерного моделирования в естественных, гуманитарных и социальных науках.  Аналитические и численные методы; их связь и противопоставление, достоинства и не', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (92, '2020-06-07 16:38:30.754519+00', '9', 'Пакеты прикладных компьютерных программ Mathcad, MathLab и Wolfram Mathematika.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (93, '2020-06-07 16:38:50.135853+00', '10', 'Способы представления числовой информации. Классификация традиционных и новых систем счисления.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (94, '2020-06-07 16:39:08.651003+00', '11', 'Башенные системы счисления. Критерий фон Неймана для оценки эффективности сжатия числовой информации. Использование  систем счисления в задачах шифрования текстовых сообщений.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (95, '2020-06-07 16:39:25.631276+00', '12', 'Эвристические и численные методы оценивания корней нелинейных алгебраических уравнений.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (96, '2020-06-07 16:39:41.493817+00', '13', 'Многогранники Ньютона и смешанные объёмы. Оценка числа решений системы нелинейных алгебраических уравнений.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (163, '2020-06-07 23:13:21.758437+00', '10', 'OnlineCourse object (10)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (97, '2020-06-07 16:39:54.319664+00', '14', 'Прямые алгоритмы аналитического решения некоторых типов систем нелинейных алгебраических уравнений.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (98, '2020-06-07 16:40:07.656325+00', '15', 'Прямые алгоритмы интегрирования некоторых специальных типов систем линейных дифференциальных уравнений в частных производных.', 1, '[{"added": {}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (99, '2020-06-07 16:42:01.502376+00', '7', 'Условность разделения математики', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (100, '2020-06-07 16:42:31.992976+00', '12', 'Эвристические и численные методы', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (101, '2020-06-07 16:42:35.605216+00', '10', 'Способы представления числовой', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (102, '2020-06-07 16:42:39.26417+00', '13', 'Многогранники Ньютона и смешанные', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (178, '2020-06-08 07:20:14.401189+00', '6', 'Анализ данных', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (103, '2020-06-07 16:42:43.582993+00', '11', 'Башенные системы счисления', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (104, '2020-06-07 16:42:52.095969+00', '8', 'Роль математического', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (105, '2020-06-07 16:42:56.683664+00', '14', 'Прямые алгоритмы аналитического', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (106, '2020-06-07 16:43:00.394569+00', '9', 'Пакеты прикладных компьютерных', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (107, '2020-06-07 16:43:03.724588+00', '15', 'Прямые алгоритмы интегрирования', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (108, '2020-06-07 16:48:12.896036+00', '3', 'Лабораторная работа 1', 1, '[{"added": {}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (109, '2020-06-07 16:48:46.180335+00', '4', 'Лабораторная работа 2', 1, '[{"added": {}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (110, '2020-06-07 16:48:56.019192+00', '3', 'Лабораторная работа 1', 2, '[{"changed": {"fields": ["min", "max"]}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (111, '2020-06-07 16:49:24.366153+00', '5', 'Тест 1', 1, '[{"added": {}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (112, '2020-06-07 16:50:02.21292+00', '3', 'Предмет прикладной математики. Основные направления прикладной математики. Аналитические методы. Математические', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (113, '2020-06-07 16:50:08.628494+00', '4', 'Информационные системы счисления', 2, '[{"changed": {"fields": ["evaluation_tools"]}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (117, '2020-06-07 16:51:14.292834+00', '5', 'Прикладная математика', 2, '[{"changed": {"fields": ["bibliographic_reference"]}}]', 22, 1);
INSERT INTO public.django_admin_log VALUES (118, '2020-06-07 20:59:53.654033+00', '12', 'Эвристические и численные методы в запутанных неевклидовых пространствах', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (119, '2020-06-07 21:00:20.513063+00', '12', 'Эвристические и численные методы в запутанных неевклидовых пространствахЭвристические и численные методы в запутанных неевклидовых пространствахЭвристические и численные методы в запутанных неевклидов', 2, '[{"changed": {"fields": ["description"]}}]', 23, 1);
INSERT INTO public.django_admin_log VALUES (120, '2020-06-07 21:58:13.115276+00', '52', 'OnlineCourse object (52)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (121, '2020-06-07 21:58:13.120735+00', '51', 'OnlineCourse object (51)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (122, '2020-06-07 21:58:13.124974+00', '50', 'OnlineCourse object (50)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (123, '2020-06-07 21:58:13.127831+00', '49', 'OnlineCourse object (49)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (124, '2020-06-07 21:58:13.130483+00', '48', 'OnlineCourse object (48)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (125, '2020-06-07 21:58:13.133212+00', '47', 'OnlineCourse object (47)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (126, '2020-06-07 21:58:13.136315+00', '46', 'OnlineCourse object (46)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (127, '2020-06-07 21:58:13.13943+00', '45', 'OnlineCourse object (45)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (128, '2020-06-07 21:58:13.142329+00', '44', 'OnlineCourse object (44)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (129, '2020-06-07 21:58:13.146254+00', '43', 'OnlineCourse object (43)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (130, '2020-06-07 21:58:13.150347+00', '42', 'OnlineCourse object (42)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (131, '2020-06-07 21:58:13.153692+00', '41', 'OnlineCourse object (41)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (132, '2020-06-07 21:58:13.156678+00', '40', 'OnlineCourse object (40)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (133, '2020-06-07 21:58:13.162031+00', '39', 'OnlineCourse object (39)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (134, '2020-06-07 21:58:13.167785+00', '38', 'OnlineCourse object (38)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (135, '2020-06-07 21:58:13.170976+00', '37', 'OnlineCourse object (37)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (136, '2020-06-07 21:58:13.174049+00', '36', 'OnlineCourse object (36)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (137, '2020-06-07 21:58:13.177631+00', '35', 'OnlineCourse object (35)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (138, '2020-06-07 21:58:13.18049+00', '34', 'OnlineCourse object (34)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (139, '2020-06-07 21:58:13.183444+00', '33', 'OnlineCourse object (33)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (140, '2020-06-07 21:58:13.186787+00', '32', 'OnlineCourse object (32)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (141, '2020-06-07 21:58:13.189631+00', '31', 'OnlineCourse object (31)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (142, '2020-06-07 21:58:13.19258+00', '29', 'OnlineCourse object (29)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (143, '2020-06-07 21:58:13.195363+00', '27', 'OnlineCourse object (27)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (144, '2020-06-07 21:58:13.198236+00', '26', 'OnlineCourse object (26)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (145, '2020-06-07 21:58:13.201161+00', '25', 'OnlineCourse object (25)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (146, '2020-06-07 21:58:13.204251+00', '24', 'OnlineCourse object (24)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (147, '2020-06-07 21:58:13.207236+00', '18', 'OnlineCourse object (18)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (148, '2020-06-07 21:58:13.210432+00', '16', 'OnlineCourse object (16)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (149, '2020-06-07 21:58:13.213272+00', '14', 'OnlineCourse object (14)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (150, '2020-06-07 21:58:13.21666+00', '10', 'OnlineCourse object (10)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (151, '2020-06-07 21:58:13.219689+00', '7', 'OnlineCourse object (7)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (152, '2020-06-07 21:58:13.223082+00', '5', 'OnlineCourse object (5)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (153, '2020-06-07 21:58:13.225664+00', '3', 'OnlineCourse object (3)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (154, '2020-06-07 22:02:58.943612+00', '1', 'OnlineCourse object (1)', 3, '', 28, 1);
INSERT INTO public.django_admin_log VALUES (155, '2020-06-07 23:10:16.388221+00', '1', 'OnlineCourse object (1)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (156, '2020-06-07 23:10:32.812278+00', '2', 'OnlineCourse object (2)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (157, '2020-06-07 23:10:44.147115+00', '3', 'OnlineCourse object (3)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (158, '2020-06-07 23:12:09.706434+00', '4', 'OnlineCourse object (4)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (159, '2020-06-07 23:12:24.915482+00', '5', 'OnlineCourse object (5)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (160, '2020-06-07 23:12:49.193436+00', '7', 'OnlineCourse object (7)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (161, '2020-06-07 23:13:06.714913+00', '8', 'OnlineCourse object (8)', 2, '[{"changed": {"fields": ["title", "description"]}}]', 28, 1);
INSERT INTO public.django_admin_log VALUES (164, '2020-06-08 07:17:21.904001+00', '11', 'PrerequisitesOfWorkProgram object (11)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (165, '2020-06-08 07:17:21.91383+00', '10', 'PrerequisitesOfWorkProgram object (10)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (166, '2020-06-08 07:17:21.92255+00', '9', 'PrerequisitesOfWorkProgram object (9)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (167, '2020-06-08 07:17:21.927132+00', '8', 'PrerequisitesOfWorkProgram object (8)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (168, '2020-06-08 07:17:21.934913+00', '7', 'PrerequisitesOfWorkProgram object (7)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (169, '2020-06-08 07:17:21.942752+00', '6', 'PrerequisitesOfWorkProgram object (6)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (170, '2020-06-08 07:17:21.947853+00', '5', 'PrerequisitesOfWorkProgram object (5)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (171, '2020-06-08 07:17:21.951714+00', '4', 'PrerequisitesOfWorkProgram object (4)', 3, '', 20, 1);
INSERT INTO public.django_admin_log VALUES (172, '2020-06-08 07:19:45.504802+00', '96', 'сущность 4', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (173, '2020-06-08 07:19:45.513011+00', '95', 'сущность 2', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (174, '2020-06-08 07:19:45.516339+00', '94', 'сущность', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (175, '2020-06-08 07:19:45.519584+00', '92', 'Сущность 2', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (176, '2020-06-08 07:19:45.522354+00', '91', 'Сущность 1', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (177, '2020-06-08 07:19:45.525397+00', '90', 'Название учебной сущности', 3, '', 8, 1);
INSERT INTO public.django_admin_log VALUES (179, '2020-06-08 07:21:06.818741+00', '6', 'Анализ данных', 3, '', 7, 1);
INSERT INTO public.django_admin_log VALUES (180, '2020-06-08 07:21:06.823564+00', '4', 'Машинное обучение', 3, '', 7, 1);
INSERT INTO public.django_admin_log VALUES (181, '2020-06-08 07:21:06.826443+00', '3', 'Физика', 3, '', 7, 1);
INSERT INTO public.django_admin_log VALUES (182, '2020-06-08 07:21:06.829229+00', '2', 'Математика', 3, '', 7, 1);
INSERT INTO public.django_admin_log VALUES (183, '2020-06-08 07:21:13.705126+00', '7', 'Анализ данных', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (184, '2020-06-08 07:23:09.216131+00', '7', 'Анализ данных', 3, '', 7, 1);
INSERT INTO public.django_admin_log VALUES (185, '2020-06-08 07:33:06.996789+00', '8', 'Анализ данных', 1, '[{"added": {}}]', 7, 1);
INSERT INTO public.django_admin_log VALUES (186, '2020-06-08 07:35:57.36198+00', '12', 'PrerequisitesOfWorkProgram object (12)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (187, '2020-06-08 07:36:03.279991+00', '13', 'PrerequisitesOfWorkProgram object (13)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (188, '2020-06-08 07:36:12.593749+00', '14', 'PrerequisitesOfWorkProgram object (14)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (189, '2020-06-08 07:36:20.319464+00', '15', 'PrerequisitesOfWorkProgram object (15)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (190, '2020-06-08 07:36:27.197415+00', '16', 'PrerequisitesOfWorkProgram object (16)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (191, '2020-06-08 07:36:36.200299+00', '17', 'PrerequisitesOfWorkProgram object (17)', 1, '[{"added": {}}]', 20, 1);
INSERT INTO public.django_admin_log VALUES (192, '2020-06-08 07:50:08.438526+00', '4', 'Лабораторная работа 2', 2, '[{"changed": {"fields": ["description"]}}]', 15, 1);
INSERT INTO public.django_admin_log VALUES (193, '2020-06-08 22:33:41.339448+00', '7', 'раздел для оценочных средств', 1, '[{"added": {}}]', 14, 1);
INSERT INTO public.django_admin_log VALUES (194, '2020-06-12 16:39:06.526386+00', '5', 'сс', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (195, '2020-06-12 16:39:15.055905+00', '5', 'крутой профиль оп', 2, '[{"changed": {"fields": ["educational_profile"]}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (196, '2020-06-14 18:43:06.603629+00', '31', 'крутой профиль оп', 1, '[{"added": {}}]', 30, 1);
INSERT INTO public.django_admin_log VALUES (197, '2020-06-15 19:46:06.958757+00', '42', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (198, '2020-06-15 19:46:07.060038+00', '41', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (199, '2020-06-15 19:46:07.093857+00', '40', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (200, '2020-06-15 19:46:07.126731+00', '39', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (201, '2020-06-15 19:46:07.160526+00', '38', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (202, '2020-06-15 19:46:07.193938+00', '37', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (203, '2020-06-15 19:46:07.2277+00', '36', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (204, '2020-06-15 19:46:07.260574+00', '35', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (205, '2020-06-15 19:46:07.29387+00', '34', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (206, '2020-06-15 19:46:07.326839+00', '33', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (207, '2020-06-15 19:46:07.360664+00', '32', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (208, '2020-06-15 19:46:07.393829+00', '31', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (209, '2020-06-15 19:46:07.427555+00', '29', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (210, '2020-06-15 19:46:07.460615+00', '28', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (211, '2020-06-15 19:46:07.493949+00', '27', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (212, '2020-06-15 19:46:07.529024+00', '26', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (213, '2020-06-15 19:46:07.560539+00', '25', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (214, '2020-06-15 19:46:07.593544+00', '24', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (215, '2020-06-15 19:46:07.62726+00', '23', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (216, '2020-06-15 19:46:07.66157+00', '22', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (217, '2020-06-15 19:46:07.694559+00', '21', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (218, '2020-06-15 19:46:07.727219+00', '20', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (219, '2020-06-15 19:46:07.810654+00', '19', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (220, '2020-06-15 19:46:07.844761+00', '18', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (221, '2020-06-15 19:46:07.877537+00', '17', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (222, '2020-06-15 19:46:07.91034+00', '16', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (223, '2020-06-15 19:46:07.94395+00', '15', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (224, '2020-06-15 19:46:07.976902+00', '14', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (225, '2020-06-15 19:46:08.010684+00', '13', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (226, '2020-06-15 19:46:08.043686+00', '12', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (227, '2020-06-15 19:46:08.077211+00', '11', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (228, '2020-06-15 19:46:08.110345+00', '10', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (229, '2020-06-15 19:46:08.144032+00', '9', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (230, '2020-06-15 19:46:08.176942+00', '8', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (231, '2020-06-15 19:46:08.210692+00', '7', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (232, '2020-06-15 19:46:08.243624+00', '6', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (233, '2020-06-15 19:46:08.280378+00', '5', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (234, '2020-06-15 19:46:08.310596+00', '4', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (235, '2020-06-15 19:46:08.34412+00', '3', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (236, '2020-06-15 19:46:08.376937+00', '2', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (237, '2020-06-15 19:46:08.410769+00', '1', 'крутой профиль оп', 3, '', 30, 1);
INSERT INTO public.django_admin_log VALUES (238, '2020-06-16 14:30:20.336511+00', '15', 'Блок 3sdfgкекеfgsdworkprogramsapp.WorkProgram.None', 2, '[{"changed": {"fields": ["work_program"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (239, '2020-06-16 14:30:23.414321+00', '14', 'Блок 2sdfgкекеfgsdworkprogramsapp.WorkProgram.None', 2, '[{"changed": {"fields": ["work_program"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (240, '2020-06-16 15:12:43.374272+00', '9', 'Модуль 3Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (241, '2020-06-16 15:12:43.445208+00', '8', 'Модуль 2Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (242, '2020-06-16 15:12:43.478193+00', '7', 'Модуль 1Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (243, '2020-06-16 15:12:43.51961+00', '6', 'Модуль 3Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (244, '2020-06-16 15:12:43.553323+00', '5', 'Модуль 2Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (245, '2020-06-16 15:12:43.586352+00', '4', 'Модуль 1Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (246, '2020-06-16 15:12:43.653172+00', '3', 'Модуль 3Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (247, '2020-06-16 15:12:43.687031+00', '2', 'Модуль 2Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (248, '2020-06-16 15:12:43.719736+00', '1', 'Модуль 1Noneworkprogramsapp.WorkProgram.None', 3, '', 33, 1);
INSERT INTO public.django_admin_log VALUES (249, '2020-06-16 15:43:16.777487+00', '1', 'Модуль 2Блок 1ывыdfd11erefffrerрвпвworkprogramsapp.WorkProgram.None', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log VALUES (250, '2020-06-16 15:43:22.542816+00', '2', 'Модуль 3Блок 1ывыdfd11erefffrerрвпвworkprogramsapp.WorkProgram.None', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log VALUES (251, '2020-06-16 15:46:08.640965+00', '3', 'Модуль 1Блок 1ывыdfd11erefffrerрвпвworkprogramsapp.WorkProgram.None', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log VALUES (252, '2020-06-16 15:46:29.606157+00', '4', 'Модуль 1Блок 1ывыdfd11erefffrerрвпвworkprogramsapp.WorkProgram.None', 1, '[{"added": {}}]', 34, 1);
INSERT INTO public.django_admin_log VALUES (253, '2020-06-20 11:32:37.498348+00', '41', 'Блок 1. Модули (дисциплины)None', 1, '[{"added": {}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (254, '2020-06-20 11:32:55.487286+00', '24', 'Экспертный профиль', 1, '[{"added": {}}]', 32, 1);
INSERT INTO public.django_admin_log VALUES (255, '2020-06-20 11:33:10.614355+00', '41', 'Блок 1. Модули (дисциплины)Экспертный профиль', 2, '[{"changed": {"fields": ["academic_plan"]}}]', 31, 1);
INSERT INTO public.django_admin_log VALUES (256, '2020-06-20 11:36:22.873599+00', '19', 'Общеуниверситетский модульБлок 1. Модули (дисциплины)Экспертный профиль', 1, '[{"added": {}}]', 33, 1);


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_content_type VALUES (1, 'admin', 'logentry');
INSERT INTO public.django_content_type VALUES (2, 'auth', 'permission');
INSERT INTO public.django_content_type VALUES (3, 'auth', 'group');
INSERT INTO public.django_content_type VALUES (4, 'contenttypes', 'contenttype');
INSERT INTO public.django_content_type VALUES (5, 'sessions', 'session');
INSERT INTO public.django_content_type VALUES (6, 'dataprocessing', 'user');
INSERT INTO public.django_content_type VALUES (7, 'dataprocessing', 'domain');
INSERT INTO public.django_content_type VALUES (8, 'dataprocessing', 'items');
INSERT INTO public.django_content_type VALUES (9, 'dataprocessing', 'relation');
INSERT INTO public.django_content_type VALUES (10, 'django_summernote', 'attachment');
INSERT INTO public.django_content_type VALUES (11, 'authtoken', 'token');
INSERT INTO public.django_content_type VALUES (12, 'corsheaders', 'corsmodel');
INSERT INTO public.django_content_type VALUES (13, 'workprogramsapp', 'competence');
INSERT INTO public.django_content_type VALUES (14, 'workprogramsapp', 'disciplinesection');
INSERT INTO public.django_content_type VALUES (15, 'workprogramsapp', 'evaluationtool');
INSERT INTO public.django_content_type VALUES (16, 'workprogramsapp', 'fieldofstudy');
INSERT INTO public.django_content_type VALUES (17, 'workprogramsapp', 'fieldofstudyworkprogram');
INSERT INTO public.django_content_type VALUES (18, 'workprogramsapp', 'indicator');
INSERT INTO public.django_content_type VALUES (19, 'workprogramsapp', 'outcomesofworkprogram');
INSERT INTO public.django_content_type VALUES (20, 'workprogramsapp', 'prerequisitesofworkprogram');
INSERT INTO public.django_content_type VALUES (21, 'workprogramsapp', 'route');
INSERT INTO public.django_content_type VALUES (22, 'workprogramsapp', 'workprogram');
INSERT INTO public.django_content_type VALUES (23, 'workprogramsapp', 'topic');
INSERT INTO public.django_content_type VALUES (24, 'workprogramsapp', 'routecomposition');
INSERT INTO public.django_content_type VALUES (25, 'workprogramsapp', 'indicatorworkprogram');
INSERT INTO public.django_content_type VALUES (26, 'workprogramsapp', 'certification');
INSERT INTO public.django_content_type VALUES (27, 'workprogramsapp', 'onlinecourse');
INSERT INTO public.django_content_type VALUES (28, 'workprogramsapp', 'bibliographicreference');
INSERT INTO public.django_content_type VALUES (30, 'workprogramsapp', 'implementationacademicplan');
INSERT INTO public.django_content_type VALUES (31, 'workprogramsapp', 'disciplineblock');
INSERT INTO public.django_content_type VALUES (32, 'workprogramsapp', 'academicplan');
INSERT INTO public.django_content_type VALUES (33, 'workprogramsapp', 'disciplineblockmodule');
INSERT INTO public.django_content_type VALUES (34, 'workprogramsapp', 'workprogramchangeindisciplineblockmodule');


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_migrations VALUES (1, 'contenttypes', '0001_initial', '2020-06-08 21:36:56.567393+00');
INSERT INTO public.django_migrations VALUES (2, 'contenttypes', '0002_remove_content_type_name', '2020-06-08 21:36:56.674519+00');
INSERT INTO public.django_migrations VALUES (3, 'auth', '0001_initial', '2020-06-08 21:36:57.297792+00');
INSERT INTO public.django_migrations VALUES (4, 'auth', '0002_alter_permission_name_max_length', '2020-06-08 21:36:58.064104+00');
INSERT INTO public.django_migrations VALUES (5, 'auth', '0003_alter_user_email_max_length', '2020-06-08 21:36:58.114396+00');
INSERT INTO public.django_migrations VALUES (6, 'auth', '0004_alter_user_username_opts', '2020-06-08 21:36:58.164912+00');
INSERT INTO public.django_migrations VALUES (7, 'auth', '0005_alter_user_last_login_null', '2020-06-08 21:36:58.214939+00');
INSERT INTO public.django_migrations VALUES (8, 'auth', '0006_require_contenttypes_0002', '2020-06-08 21:36:58.267825+00');
INSERT INTO public.django_migrations VALUES (9, 'auth', '0007_alter_validators_add_error_messages', '2020-06-08 21:36:58.314894+00');
INSERT INTO public.django_migrations VALUES (10, 'auth', '0008_alter_user_username_max_length', '2020-06-08 21:36:58.364505+00');
INSERT INTO public.django_migrations VALUES (11, 'auth', '0009_alter_user_last_name_max_length', '2020-06-08 21:36:58.415179+00');
INSERT INTO public.django_migrations VALUES (12, 'auth', '0010_alter_group_name_max_length', '2020-06-08 21:36:58.48975+00');
INSERT INTO public.django_migrations VALUES (13, 'auth', '0011_update_proxy_permissions', '2020-06-08 21:36:58.572685+00');
INSERT INTO public.django_migrations VALUES (14, 'dataprocessing', '0001_initial', '2020-06-08 21:36:59.986632+00');
INSERT INTO public.django_migrations VALUES (15, 'admin', '0001_initial', '2020-06-08 21:37:02.426613+00');
INSERT INTO public.django_migrations VALUES (16, 'admin', '0002_logentry_remove_auto_add', '2020-06-08 21:37:02.852386+00');
INSERT INTO public.django_migrations VALUES (17, 'admin', '0003_logentry_add_action_flag_choices', '2020-06-08 21:37:02.92785+00');
INSERT INTO public.django_migrations VALUES (18, 'authtoken', '0001_initial', '2020-06-08 21:37:03.376605+00');
INSERT INTO public.django_migrations VALUES (19, 'authtoken', '0002_auto_20160226_1747', '2020-06-08 21:37:03.711654+00');
INSERT INTO public.django_migrations VALUES (20, 'corsheaders', '0001_initial', '2020-06-08 21:37:03.943299+00');
INSERT INTO public.django_migrations VALUES (21, 'dataprocessing', '0002_auto_20200506_1602', '2020-06-08 21:37:04.041018+00');
INSERT INTO public.django_migrations VALUES (22, 'dataprocessing', '0003_auto_20200531_1106', '2020-06-08 21:37:04.170127+00');
INSERT INTO public.django_migrations VALUES (23, 'dataprocessing', '0004_auto_20200531_1722', '2020-06-08 21:37:04.246446+00');
INSERT INTO public.django_migrations VALUES (24, 'dataprocessing', '0005_auto_20200531_2024', '2020-06-08 21:37:04.354159+00');
INSERT INTO public.django_migrations VALUES (25, 'dataprocessing', '0006_auto_20200601_0107', '2020-06-08 21:37:04.615347+00');
INSERT INTO public.django_migrations VALUES (26, 'django_summernote', '0001_initial', '2020-06-08 21:37:04.784943+00');
INSERT INTO public.django_migrations VALUES (27, 'django_summernote', '0002_update-help_text', '2020-06-08 21:37:04.871412+00');
INSERT INTO public.django_migrations VALUES (28, 'sessions', '0001_initial', '2020-06-08 21:37:05.252155+00');
INSERT INTO public.django_migrations VALUES (29, 'workprogramsapp', '0001_initial', '2020-06-08 21:37:10.626685+00');
INSERT INTO public.django_migrations VALUES (30, 'workprogramsapp', '0002_auto_20200430_1008', '2020-06-08 21:37:16.438343+00');
INSERT INTO public.django_migrations VALUES (31, 'workprogramsapp', '0003_auto_20200430_2018', '2020-06-08 21:37:16.568756+00');
INSERT INTO public.django_migrations VALUES (32, 'workprogramsapp', '0004_auto_20200430_2110', '2020-06-08 21:37:16.856512+00');
INSERT INTO public.django_migrations VALUES (33, 'workprogramsapp', '0005_auto_20200503_2322', '2020-06-08 21:37:17.786112+00');
INSERT INTO public.django_migrations VALUES (34, 'workprogramsapp', '0006_auto_20200504_1021', '2020-06-08 21:37:18.548654+00');
INSERT INTO public.django_migrations VALUES (35, 'workprogramsapp', '0007_auto_20200504_1215', '2020-06-08 21:37:18.877544+00');
INSERT INTO public.django_migrations VALUES (36, 'workprogramsapp', '0008_workprogram_discipline_code', '2020-06-08 21:37:18.940284+00');
INSERT INTO public.django_migrations VALUES (37, 'workprogramsapp', '0009_auto_20200505_1521', '2020-06-08 21:37:19.449673+00');
INSERT INTO public.django_migrations VALUES (38, 'workprogramsapp', '0009_auto_20200505_1338', '2020-06-08 21:37:19.8151+00');
INSERT INTO public.django_migrations VALUES (39, 'workprogramsapp', '0010_merge_20200505_1731', '2020-06-08 21:37:20.028465+00');
INSERT INTO public.django_migrations VALUES (40, 'workprogramsapp', '0011_auto_20200506_1602', '2020-06-08 21:37:20.21182+00');
INSERT INTO public.django_migrations VALUES (41, 'workprogramsapp', '0012_auto_20200507_1621', '2020-06-08 21:37:20.505983+00');
INSERT INTO public.django_migrations VALUES (42, 'workprogramsapp', '0013_topic_url_online_course', '2020-06-08 21:37:20.640596+00');
INSERT INTO public.django_migrations VALUES (43, 'workprogramsapp', '0014_auto_20200507_1623', '2020-06-08 21:37:20.863129+00');
INSERT INTO public.django_migrations VALUES (44, 'workprogramsapp', '0015_auto_20200529_1306', '2020-06-08 21:37:20.922403+00');
INSERT INTO public.django_migrations VALUES (45, 'workprogramsapp', '0016_auto_20200529_1307', '2020-06-08 21:37:21.412786+00');
INSERT INTO public.django_migrations VALUES (46, 'workprogramsapp', '0017_auto_20200531_0913', '2020-06-08 21:37:21.461121+00');
INSERT INTO public.django_migrations VALUES (47, 'workprogramsapp', '0018_auto_20200601_1829', '2020-06-08 21:37:21.995394+00');
INSERT INTO public.django_migrations VALUES (48, 'workprogramsapp', '0019_workprogram_evaluation_tool', '2020-06-08 21:37:22.595415+00');
INSERT INTO public.django_migrations VALUES (49, 'workprogramsapp', '0020_remove_workprogram_evaluation_tool', '2020-06-08 21:37:23.137177+00');
INSERT INTO public.django_migrations VALUES (50, 'workprogramsapp', '0021_auto_20200605_1953', '2020-06-08 21:37:23.296672+00');
INSERT INTO public.django_migrations VALUES (51, 'workprogramsapp', '0022_auto_20200607_2204', '2020-06-08 21:37:23.347644+00');
INSERT INTO public.django_migrations VALUES (52, 'workprogramsapp', '0022_auto_20200607_2156', '2020-06-08 21:37:23.409026+00');
INSERT INTO public.django_migrations VALUES (53, 'workprogramsapp', '0023_merge_20200607_2327', '2020-06-08 21:37:23.520178+00');
INSERT INTO public.django_migrations VALUES (64, 'workprogramsapp', '0008_workprogram_discipline_code', '2020-05-04 13:58:28.947739+00');
INSERT INTO public.django_migrations VALUES (65, 'workprogramsapp', '0009_auto_20200505_1521', '2020-05-05 16:52:45.020459+00');
INSERT INTO public.django_migrations VALUES (66, 'workprogramsapp', '0009_auto_20200505_1338', '2020-05-05 17:48:06.092483+00');
INSERT INTO public.django_migrations VALUES (67, 'workprogramsapp', '0010_merge_20200505_1731', '2020-05-05 17:48:06.128229+00');
INSERT INTO public.django_migrations VALUES (68, 'dataprocessing', '0002_auto_20200506_1602', '2020-05-06 16:13:52.717717+00');
INSERT INTO public.django_migrations VALUES (69, 'workprogramsapp', '0011_auto_20200506_1602', '2020-05-06 16:15:13.505255+00');
INSERT INTO public.django_migrations VALUES (70, 'workprogramsapp', '0012_auto_20200507_1621', '2020-05-07 16:27:25.251578+00');
INSERT INTO public.django_migrations VALUES (71, 'workprogramsapp', '0013_topic_url_online_course', '2020-05-07 16:27:25.288927+00');
INSERT INTO public.django_migrations VALUES (72, 'workprogramsapp', '0014_auto_20200507_1623', '2020-05-07 16:27:25.328452+00');
INSERT INTO public.django_migrations VALUES (77, 'workprogramsapp', '0016_auto_20200529_1307', '2020-05-29 15:39:00.596017+00');
INSERT INTO public.django_migrations VALUES (78, 'workprogramsapp', '0017_auto_20200529_1537', '2020-05-29 15:39:00.616637+00');
INSERT INTO public.django_migrations VALUES (79, 'dataprocessing', '0003_auto_20200531_1106', '2020-06-01 20:40:42.511581+00');
INSERT INTO public.django_migrations VALUES (80, 'dataprocessing', '0004_auto_20200531_1722', '2020-06-01 20:40:42.545924+00');
INSERT INTO public.django_migrations VALUES (81, 'dataprocessing', '0005_auto_20200531_2024', '2020-06-01 20:40:42.617713+00');
INSERT INTO public.django_migrations VALUES (112, 'dataprocessing', '0006_auto_20200601_0107', '2020-06-01 20:41:53.553733+00');
INSERT INTO public.django_migrations VALUES (113, 'workprogramsapp', '0017_auto_20200531_0913', '2020-06-01 20:41:53.568632+00');
INSERT INTO public.django_migrations VALUES (114, 'workprogramsapp', '0018_auto_20200601_1829', '2020-06-01 20:41:53.632923+00');
INSERT INTO public.django_migrations VALUES (115, 'workprogramsapp', '0019_workprogram_evaluation_tool', '2020-06-03 19:46:44.480806+00');
INSERT INTO public.django_migrations VALUES (116, 'workprogramsapp', '0020_remove_workprogram_evaluation_tool', '2020-06-03 19:46:44.572882+00');
INSERT INTO public.django_migrations VALUES (117, 'workprogramsapp', '0021_auto_20200605_1953', '2020-06-07 12:25:36.013673+00');
INSERT INTO public.django_migrations VALUES (118, 'workprogramsapp', '0022_auto_20200607_2204', '2020-06-07 22:23:14.663352+00');
INSERT INTO public.django_migrations VALUES (119, 'workprogramsapp', '0022_auto_20200607_2156', '2020-06-08 08:03:34.613261+00');
INSERT INTO public.django_migrations VALUES (120, 'workprogramsapp', '0023_merge_20200607_2327', '2020-06-08 08:03:34.626576+00');
INSERT INTO public.django_migrations VALUES (121, 'workprogramsapp', '0024_outcomesofworkprogram_evaluation_tool', '2020-06-09 18:22:45.882251+00');
INSERT INTO public.django_migrations VALUES (122, 'workprogramsapp', '0025_fieldofstudy_faculty', '2020-06-10 15:35:05.018047+00');
INSERT INTO public.django_migrations VALUES (123, 'workprogramsapp', '0026_auto_20200612_1629', '2020-06-12 16:29:22.803858+00');
INSERT INTO public.django_migrations VALUES (124, 'workprogramsapp', '0027_auto_20200612_1859', '2020-06-12 18:59:29.54333+00');
INSERT INTO public.django_migrations VALUES (125, 'workprogramsapp', '0028_auto_20200614_1837', '2020-06-14 18:37:37.394412+00');
INSERT INTO public.django_migrations VALUES (126, 'workprogramsapp', '0029_auto_20200614_1954', '2020-06-14 19:54:40.695412+00');
INSERT INTO public.django_migrations VALUES (127, 'workprogramsapp', '0030_auto_20200615_1953', '2020-06-15 19:53:12.988774+00');
INSERT INTO public.django_migrations VALUES (128, 'workprogramsapp', '0031_auto_20200616_1455', '2020-06-16 14:55:41.928577+00');
INSERT INTO public.django_migrations VALUES (129, 'workprogramsapp', '0032_auto_20200616_1528', '2020-06-16 15:28:35.025527+00');
INSERT INTO public.django_migrations VALUES (162, 'workprogramsapp', '0033_auto_20200616_1720', '2020-06-16 17:21:00.051411+00');
INSERT INTO public.django_migrations VALUES (163, 'workprogramsapp', '0034_auto_20200619_0859', '2020-06-19 08:59:39.276407+00');
INSERT INTO public.django_migrations VALUES (164, 'workprogramsapp', '0035_auto_20200625_1230', '2020-06-25 12:30:32.235297+00');
INSERT INTO public.django_migrations VALUES (165, 'workprogramsapp', '0036_workprogramchangeindisciplineblockmodule_code', '2020-06-25 12:38:19.298329+00');


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.django_session VALUES ('50rptf6zkhzunj15mlkgoldyad7wrzuq', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-09 20:22:16.663152+00');
INSERT INTO public.django_session VALUES ('cl73msh4cdos9mkeutqn1qucpreogo9v', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-11 15:21:32.221268+00');
INSERT INTO public.django_session VALUES ('wfqewmoostqujm1muirsd45qrie5iud0', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-12 11:36:12.692896+00');
INSERT INTO public.django_session VALUES ('0x5jx8vzuwsma5mudqqzxavfgglm5jwk', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-14 10:22:56.081435+00');
INSERT INTO public.django_session VALUES ('44q1l1zew42k54drwij4habyb8us99mi', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-14 10:25:03.086392+00');
INSERT INTO public.django_session VALUES ('p086mj3s9xfl0emcbksgrmp2gwfd36yv', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-14 10:25:03.228942+00');
INSERT INTO public.django_session VALUES ('6zinu0k9x0qzvirtasdx2trtqmr3orxf', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-18 11:29:03.638988+00');
INSERT INTO public.django_session VALUES ('fwt3kzrodzmbgdtdzfpt1xg6birx5fid', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-18 14:45:24.986658+00');
INSERT INTO public.django_session VALUES ('86wkvxgqux7h1lf6b2jzevnlu08lx62c', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-18 15:07:56.519415+00');
INSERT INTO public.django_session VALUES ('zlkv5pyrugs4zyuyecv48vb6iiaj5yl3', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-18 19:16:25.535052+00');
INSERT INTO public.django_session VALUES ('ns48w4op7mwbg0ohxih2x9a8otkw3bj5', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-19 14:45:05.869828+00');
INSERT INTO public.django_session VALUES ('vpkyqy2r7tybgma0gmxiuaiaaxtq8thp', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-19 16:53:08.282903+00');
INSERT INTO public.django_session VALUES ('xbqq02jn4fj9jsjz6i6oa0y5f8psjplm', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-20 14:50:53.384321+00');
INSERT INTO public.django_session VALUES ('fzzcwtguyduo5ygvja1culur47zqycla', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-21 14:26:37.910885+00');
INSERT INTO public.django_session VALUES ('8ejeb74mrjlyeevma2b47kkvy7b9p132', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-29 22:51:18.996289+00');
INSERT INTO public.django_session VALUES ('ap8qnjzwg5ls474huz6atmfd57sdk10t', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-05 17:21:29.688889+00');
INSERT INTO public.django_session VALUES ('h6u8ngswsm46fpr1bdc12ss7w1ct3596', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-06 12:11:15.175293+00');
INSERT INTO public.django_session VALUES ('8ccmn92jnxf1dweh4xgjk1oizfw1whw6', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-07 15:57:20.814074+00');
INSERT INTO public.django_session VALUES ('4q7ljnx1jepy3g8la3y1sxojyftty3q7', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-05-19 15:22:42.089229+00');
INSERT INTO public.django_session VALUES ('tmz6cnj55g79uvi0ldnwbwxi5hut4osr', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-06 19:57:17.756324+00');
INSERT INTO public.django_session VALUES ('608bf5ujqeroyq6qg8gd425yzh35b35a', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-08 16:18:39.850932+00');
INSERT INTO public.django_session VALUES ('y3gn8in4na8agscgyl91y5t0x1mg2rr8', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-11 22:18:38.143557+00');
INSERT INTO public.django_session VALUES ('w4j5k0qp0pynn20q8lg1yjtc9cw400e3', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-12 10:19:11.072001+00');
INSERT INTO public.django_session VALUES ('8n5ntw7uy4j0h2h3fneie6hbnnov857l', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-15 20:42:11.403212+00');
INSERT INTO public.django_session VALUES ('8w3bobiycphim5c7zx42lg8m2qtj531u', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-16 14:56:44.706225+00');
INSERT INTO public.django_session VALUES ('a81bi5aozhkgxomowcygb3buan37v7cp', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-17 19:50:32.483366+00');
INSERT INTO public.django_session VALUES ('fb2qql4mf9yzaqg4w6fc2btr5jja5u0o', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-19 13:23:56.785309+00');
INSERT INTO public.django_session VALUES ('0oimwp37rzshe8bm72q8n6r0vgrvv7r2', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-22 07:49:56.285131+00');
INSERT INTO public.django_session VALUES ('1eqbp49h4tihtxdlvgzp9hkkn214ou1w', 'NTc0MmQ3MjgyYzgxODBmZmRmY2NiNDY1NjA4N2QxNGM5NDhkODk0NTp7Il9hdXRoX3VzZXJfaWQiOiIxIiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiZGphbmdvLmNvbnRyaWIuYXV0aC5iYWNrZW5kcy5Nb2RlbEJhY2tlbmQiLCJfYXV0aF91c2VyX2hhc2giOiJkMjExZjJhMGMyNmViZmI0MDg4YzM3YzM3MjBlODFmZDI4YTU1OGY3In0=', '2020-06-22 22:17:50.092235+00');


--
-- Data for Name: django_summernote_attachment; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_academicplan; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_academicplan VALUES (5, 'крутой профиль оп', '2020-06-12 18:59:29.104104+00', NULL);
INSERT INTO public.workprogramsapp_academicplan VALUES (6, 'dfdfdf', '2020-06-15 19:51:56.221476+00', 'dgdfdf');
INSERT INTO public.workprogramsapp_academicplan VALUES (7, 'sdsd', '2020-06-15 19:52:21.051461+00', 'dsdsdgdfdf');
INSERT INTO public.workprogramsapp_academicplan VALUES (8, 'sdfgfgsd', '2020-06-15 19:53:25.699586+00', 'dsdsdfdfdfgdfdf');
INSERT INTO public.workprogramsapp_academicplan VALUES (9, 'sdfgкекеfgsd', '2020-06-15 19:56:24.859894+00', 'dsdsdfкекеdfdfgdfdf');
INSERT INTO public.workprogramsapp_academicplan VALUES (10, 'ывыапрвпв', '2020-06-16 15:01:11.574395+00', 'ывавапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (11, 'ывыававапрвпв', '2020-06-16 15:03:42.269484+00', 'ывавывывапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (12, 'ывыdfdfdfававапрвпв', '2020-06-16 15:04:56.322665+00', 'ываdfdfвывывапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (13, 'ывыdfdfdfававsdsdапрвпв', '2020-06-16 15:05:21.635316+00', 'ываdfdfвывsdsdывапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (14, 'ывыdfdfdfаsdsdвавsdsdапрвпв', '2020-06-16 15:08:31.924506+00', 'ываdfdfвывssdsddsdывапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (15, 'ывыdfderererрвпв', '2020-06-16 15:09:35.752172+00', 'ываdfdfвывeывапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (16, 'ывыdfderefffrerрвпв', '2020-06-16 15:11:14.804015+00', 'ываdfdfвывeыddвапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (17, 'ывыdfd11erefffrerрвпв', '2020-06-16 15:13:10.801673+00', 'ываdfdfвывe111ыddвапрпв');
INSERT INTO public.workprogramsapp_academicplan VALUES (18, 'sqwqwqwdsd', '2020-06-20 10:49:08.734637+00', 'sdsdsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (19, 'sdfdfdfd', '2020-06-20 10:50:08.838609+00', 'sfdfdfdffdsdsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (20, 'sdfdsdsdsfdfd', '2020-06-20 10:50:27.497024+00', 'sfdfdfdfdsdsdfdsdsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (21, 'sdfdsdsdsdssdsfdfd', '2020-06-20 10:50:55.585255+00', 'sfdfdfdfddsdsdsdsdfdsdsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (22, 'sdfdsdsdfdfdsdssdsfdfd', '2020-06-20 11:24:47.489823+00', 'sfdfdfdfddsdsdsdsdfdfdfdsdsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (23, 'sdfdsdsdfdfgfgfdsdssdsfdfd', '2020-06-20 11:25:16.343442+00', 'sfdfdfdfddsdsdsdsdfdfdfdfgfgsdsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (24, 'Экспертный профиль', '2020-06-20 11:32:55.486488+00', '1');
INSERT INTO public.workprogramsapp_academicplan VALUES (25, 'sdfdsdsdfdfgfgfdsdssdfdfdsfdfd', '2020-06-20 11:35:32.515495+00', 'sfdfdfdfddsdsdsdssdsdfdfdfdfgfgsddsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (26, 'sdfdsdsdfdfваваgfgfdsdssdfdfdsfdfd', '2020-06-20 11:36:36.645036+00', 'sfdfdfdfddsdsdsваваdssdsdfdfdfdfgfgsddsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (27, 'sdfdsdsdfdfваваgfgfdsdssdsdsdfdfdsfdfd', '2020-06-20 11:41:13.507305+00', 'sfdfdfdfddsdsdsваваdssdsdsdsdfdfdfdfgfgsddsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (28, 'sdfdsdsdfdfваваgfgsdsdfdsdssdsdsdfdfdsfdfd', '2020-06-20 11:42:00.270986+00', 'sfdfdfdfddsdsdsваваdssdsdsdssdsddfdfdfdfgfgsddsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (29, 'sdfddfdfsdsdfdfваваgfgsdsdfdsdssdsdsdfdfdsfdfd', '2020-06-20 11:47:24.666065+00', 'sfdfdfdfddsdsdsваваdssdsddfdfsdssdsddfdfdfdfgfgsddsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (30, 'sdfddfdfsdsdfdfваsdsdваgfgsdsdfdsdssdsdsdfdfdsfdfd', '2020-06-20 11:47:58.047326+00', 'sfdfdfdfddsdsdsваваdssdsddfdfsdsdsdssdsddfdfdfdfgfgsddsd');
INSERT INTO public.workprogramsapp_academicplan VALUES (31, 'stwewering', '2020-06-20 12:35:29.69748+00', 'striererng');


--
-- Data for Name: workprogramsapp_bibliographicreference; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_bibliographicreference VALUES (26, 'Воскобойников Ю.Е., Задорожный А.Ф. Основы вычислений и программирования в пакете MathCAD PRIME. Учебное пособие. — Лань, 2016 г. ISBN: 978-5-8114-2052-0');
INSERT INTO public.workprogramsapp_bibliographicreference VALUES (25, 'Прикладная математика для инженеров. Специальные курсы : [доп. МВ и ССО СССР в качестве учебного пособия для студентов высших технических учебных заведений] / А. Д. Мышкис .— Изд. 3-е, доп .— М. : ФИЗМАТЛИТ, 2007 .— 687, [1] с. : ил. — (Математика. Прикладная математика) .— Библиогр.: с. 672-677 .— ISBN 978-5-9221-0747-1.');
INSERT INTO public.workprogramsapp_bibliographicreference VALUES (24, 'Математические методы прогнозирования : рек. УМО по классич. унив. образованию в качестве учебного пособия для студентов высш. учеб. заведений (направл.) подготовки ВПО 010501 (010500.62) "Прикл. математика и информатика" / А. М. Шурыгин .— М. : Горячая линия - Телеком, 2009 .— 178, [2] с. : ил. — (Учебное пособие для высших учебных заведений) .— Имен. указ.: с. 175-176 .— Предм. указ.: с. 177-178 .— ISBN 978-5-9912-0062-2.');
INSERT INTO public.workprogramsapp_bibliographicreference VALUES (27, 'Решение задач вычислительной математики в пакетах Mathcad 12, MATLAB 7, Maple 9 / Е. Р. Алексеев, О. В. Чеснокова .— М. : НТ Пресс, 2006 .— 492 с. : ил .— (Самоучитель) .— Прил.: с. 425-484 .— Библиогр.: с.486-487 .— Предм. указ.: с. 488-492 .— ISBN 5-477-00208-5');
INSERT INTO public.workprogramsapp_bibliographicreference VALUES (28, 'Руководство по методам вычислений и приложения MATHCAD : доп. УМО по образованию в обл. Прикл. математики и управления качеством в качестве учебного пособия для студентов высш. учеб. заведений, обучающихся по направл. подготовки 230400 "Прикл. математика" спец-сти "Прикл. математика" / В. И. Ракитин .— М. : ФИЗМАТЛИТ, 2005 .— 263, [1] с. : ил. — Библиогр.: с. 259-260 .— ISBN 5-9221-0636-8');
INSERT INTO public.workprogramsapp_bibliographicreference VALUES (29, 'Буре, В.М. Теория вероятностей и математическая статистика. [Электронный ресурс] : учеб. / В.М. Буре, Е.М. Парилина. — Электрон. дан. — СПб. : Лань, 2013. — 416 с. — Режим доступа: http://e.lanbook.com/book/10249 — Загл. с экрана');
INSERT INTO public.workprogramsapp_bibliographicreference VALUES (30, 'Горлач, Б.А. Теория вероятностей и математическая статистика. [Электронный ресурс] : учеб.-метод. пособие — Электрон. дан. — СПб. : Лань, 2013. — 320 с. — Режим доступа: http://e.lanbook.com/book/4864 — Загл. с экрана');


--
-- Data for Name: workprogramsapp_certification; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_certification VALUES (1, 'EX', 1, 'Очень сложный экзамен', 12, 2);


--
-- Data for Name: workprogramsapp_competence; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_competence VALUES (1, 'ПКС-1.1', 'Способен управлять аналитическими работами и работать со сложными структурами данных при решении практических задач программирования');
INSERT INTO public.workprogramsapp_competence VALUES (2, 'ПКС-1.3', 'Способен собирать, обрабатывать с использованием современных информационных технологий и интерпретировать необходимые данные для формирования суждений по соответствующим социальным, научным и профессиональным проблемам');
INSERT INTO public.workprogramsapp_competence VALUES (3, 'string', 'string');


--
-- Data for Name: workprogramsapp_competence_field_of_study; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_competence_field_of_study VALUES (1, 1, 1);
INSERT INTO public.workprogramsapp_competence_field_of_study VALUES (2, 2, 1);


--
-- Data for Name: workprogramsapp_competence_work_program; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_competence_work_program VALUES (1, 1, 2);
INSERT INTO public.workprogramsapp_competence_work_program VALUES (2, 2, 2);


--
-- Data for Name: workprogramsapp_disciplineblock; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_disciplineblock VALUES (10, 'Блок 1', 8);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (11, 'Блок 2', 8);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (12, 'Блок 3', 8);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (13, 'Блок 1', 9);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (15, 'Блок 3', 9);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (14, 'Блок 2', 9);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (16, 'Блок 1', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (17, 'Блок 2', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (18, 'Блок 3', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (19, 'Блок 1', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (20, 'Блок 2', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (21, 'Блок 3', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (22, 'Блок 1', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (23, 'Блок 2', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (24, 'Блок 3', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (25, 'Блок 1', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (26, 'Блок 2', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (27, 'Блок 3', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (28, 'Блок 1', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (29, 'Блок 2', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (30, 'Блок 3', NULL);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (31, 'Блок 1', 15);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (32, 'Блок 2', 15);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (33, 'Блок 3', 15);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (34, 'Блок 1', 16);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (35, 'Блок 2', 16);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (36, 'Блок 3', 16);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (37, 'Блок 1', 17);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (38, 'Блок 2', 17);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (39, 'Блок 3', 17);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (40, 'Блок 1', 23);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (41, 'Блок 1. Модули (дисциплины)', 24);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (42, 'Блок 1. Модули (дисциплины)', 25);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (43, 'Блок 1. Модули (дисциплины)', 26);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (44, 'Блок 1. Модули (дисциплины)', 27);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (45, 'Блок 1. Модули (дисциплины)', 28);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (46, 'Блок 1. Модули (дисциплины)', 29);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (47, 'Блок 1. Модули (дисциплины)', 30);
INSERT INTO public.workprogramsapp_disciplineblock VALUES (48, 'Блок 1. Модули (дисциплины)', 31);


--
-- Data for Name: workprogramsapp_disciplineblockmodule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (10, 'Модуль 1', 37);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (11, 'Модуль 2', 37);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (12, 'Модуль 3', 37);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (13, 'Модуль 1', 38);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (14, 'Модуль 2', 38);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (15, 'Модуль 3', 38);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (16, 'Модуль 1', 39);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (17, 'Модуль 2', 39);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (18, 'Модуль 3', 39);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (19, 'Общеуниверситетский модуль', 41);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (20, 'Общеуниверситетский модуль', 47);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (21, 'Общеуниверситетский модуль', 48);
INSERT INTO public.workprogramsapp_disciplineblockmodule VALUES (22, 'wewewe', 10);


--
-- Data for Name: workprogramsapp_disciplinesection; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_disciplinesection VALUES (5, 'Методы решения нелинейных алгебраических уравнений и систем', 5, 45, 45, NULL, 23, NULL, 113, 1);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (1, '1 Основы построения и анализа алгоритмов', 2, NULL, 100, NULL, NULL, NULL, 100, 2);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (16, 'Хочу проверить скролл', 2, 100, 10, 10, 50, NULL, 170, 5);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (15, 'Гыгыгы2', 2, NULL, NULL, NULL, 100, 20, 120, 4);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (11, 'Раздел про плюшки', 2, 10, 10, NULL, NULL, 11, 31, 3);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (2, '2 Основные абстрактные типы данных', 2, 10, 10, 10, 10, 10, 50, 1);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (3, 'Предмет прикладной математики. Основные направления прикладной математики. Аналитические методы. Математические', 5, 45, 34, 23, 2, NULL, 104, 3);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (4, 'Информационные системы счисления', 5, 10, 34, 10, 2, 10, 66, 2);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (6, 'Сингулярное разложение матриц', 5, 22, NULL, NULL, 15, NULL, 37, 4);
INSERT INTO public.workprogramsapp_disciplinesection VALUES (7, 'раздел для оценочных средств', 2, NULL, NULL, NULL, NULL, NULL, NULL, 1);


--
-- Data for Name: workprogramsapp_disciplinesection_evaluation_tools; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (5, 3, 3);
INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (6, 3, 5);
INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (7, 4, 4);
INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (8, 4, 5);
INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (9, 7, 14);
INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (12, 1, 15);
INSERT INTO public.workprogramsapp_disciplinesection_evaluation_tools VALUES (13, 2, 15);


--
-- Data for Name: workprogramsapp_evaluationtool; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_evaluationtool VALUES (3, 'Лабораторная работа', 'Лабораторная работа 1', 'Очень крутая работа', true, 15, 6, 10);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (5, 'Тест', 'Тест 1', 'Очень сложный тест', true, 10, 6, 10);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (4, 'Лабораторная работа', 'Лабораторная работа 2', '<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>ЛАБОРАТОРНАЯ РАБОТА №2</strong></span></span></p>  <p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>АНАЛИЗ ДАННЫХ. ПОСТРОЕНИЕ ИНФОЛОГИЧЕСКОЙ МОДЕЛИ ДАННЫХ БД</strong></span></span></p>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Цель лабораторной работы: о</strong>владеть практическими навыками проведения анализа данных системы и построения инфологической модели данных БД.</span></span></p>  <p style="margin-left:30px; text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Задачи:</span></span></strong></span></span></p>  <ol> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Проанализировать предметную область согласно варианту задания.</span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Выполнить инфологическое моделирование базы данных по заданной предметной области с использованием метода ER-диаграмм (&laquo;сущность-связь&raquo;) в нотации Питера Чена.</span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Реализовать разработанную ИЛМ с использованием <strong><span style="color:black">CA</span> </strong><strong><span style="color:black">ERwin</span> </strong><strong><span style="color:black">Data</span> </strong><strong><span style="color:black">Modeler</span><span style="color:black">.</span></strong></span></span></li> </ol>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Индивидуальное задание:</strong></span></span></p>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;&hellip;.</span></span></p>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Технология выполнения лабораторной работы:</strong></span></span></p>  <ol> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Изучить предметную область.</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Выполнить следующие этапы моделирования структур данных:</span></span></span></span></li> </ol>  <ol style="list-style-type:lower-alpha"> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">проанализировать состав объектов предметной области и атрибутов, их характеризующих;</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">определить вычисляемые атрибуты, которые можно не хранить в БД;</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">выделить сущности:</span></span></span></span></li> </ol>  <ul> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">стержневые</span></span></strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">;</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">характеристические (зависимые)</span></span></strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">: выделяются на основе анализа многозначных или составных свойств сущности;</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">обозначающие</span></span></strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">;</span></span></span></span></li> </ul>  <ol start="4" style="list-style-type:lower-alpha"> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">выделить <strong>связи</strong>: ассоциации между независимыми сущностями. Проанализировать свойства связей: определить <strong>тип связи</strong> и <strong>классы принадлежности сущностей</strong>;</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">проанализировать свойства связей для характеристических и обозначающих сущностей: определить <strong>тип связи</strong> и <strong>классы принадлежности сущностей</strong>;</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">проанализировать свойства связей: выделить <strong>атрибуты связей</strong> и определить <strong>ключи</strong> (первичные и внешние);</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">представить состав реквизитов сущностей в виде &quot;название сущности (перечень реквизитов)&quot;: <em>Студенты </em>(<u>код студента</u>, фамилия,<strong> </strong>имя, отчество, номер группы, дата рождения, стипендия, оценки).</span></span></span></span></li> </ol>  <ol start="3"> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">На основе проведенного анализа построить схему инфологической модели в виде <strong>схемы данных (диаграммы </strong></span></span><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">ER</span></span></strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">-типов)</span></span></strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">.</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Выполнить моделирование в среде </span></span><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">CA</span></span></span></strong><strong> </strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">ERwin</span></span></span></strong><strong> </strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">Process</span></span></span></strong><strong> </strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">Modeler</span></span></span></strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black"> (создать модель </span></span></span></strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">Logical</span></span></span></strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">/</span></span></span></strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">Physical</span></span></span></strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">.</span></span></span></strong></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Дать <strong>характеристику атрибутов сущностей</strong> (типизация (структурная часть) и их ограничения&nbsp; (целостная часть)) по следующей схеме. Для внешних ключей необходимо указать правила соответствия первичным ключам (для связываемых сущностей). Таблицу 1 заполнить согласно свойствам элементов модели в </span></span><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">CA</span></span></span></strong><strong> </strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">ERwin</span></span></span></strong><strong> </strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">Process</span></span></span></strong><strong> </strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">Modeler</span></span></span></strong><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Calibri&quot;,sans-serif"><span style="color:black">.</span></span></span></strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif"> В таблице 1 приведены некоторые примеры описания атрибутов: </span></span></span></span></li> </ol>  <p style="text-align:justify">&nbsp;</p>  <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Таблица 1</span></span></span></span></p>  <p style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Описание атрибутов сущностей</span></span></span></span></p>  <table cellspacing="0" class="Table" style="border-collapse:collapse; border:none; margin-left:7px; width:640px"> 	<tbody> 		<tr> 			<td rowspan="2" style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:2px solid black; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Наименова-ние атрибута</span></span></strong></span></span></p> 			</td> 			<td rowspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:2px solid black; width:92px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Тип</span></span></strong></span></span></p> 			</td> 			<td colspan="3" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:2px solid black; width:180px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Первичный ключ</span></span></strong></span></span></p> 			</td> 			<td rowspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:2px solid black; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Внеш-ний ключ</span></span></strong></span></span></p> 			</td> 			<td rowspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:2px solid black; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Обяза-тель-ность</span></span></strong></span></span></p> 			</td> 			<td rowspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:2px solid black; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Ограниче-ния целостности</span></span></strong></span></span></p> 			</td> 		</tr> 		<tr> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Собствен-ный атрибут</span></span></strong></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Внеш-ний ключ</span></span></strong></span></span></p> 			</td> 		</tr> 		<tr> 			<td colspan="8" style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; height:22px; width:640px"> 			<p><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Сущность 1</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Атрибут 1.1</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:92px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">INTEGER</span></span></span></span></p> 			</td> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">+</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">+</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Уникален, необходимо обеспечить автомати-ческую генерацию значения</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Атрибут1.2</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:92px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">CHAR(18)</span></span></span></span></p> 			</td> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">+</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Значение должно выбираться из списка &hellip;</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Атрибут 1.3</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:92px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">+</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">-</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Значение каскадиру-ется по первичному ключу сущности&nbsp; &hellip;</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Атрибут 1.4</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:92px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">+</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Значение атрибута &gt; 1980</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:92px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td colspan="8" style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:640px"> 			<p><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Сущность 2</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Атрибут 2.1</span></span></span></span></p> 			</td> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:100px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:99px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">+</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center">&nbsp;</p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">+</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Значение каскадирует-ся по первичному ключу сущности&nbsp; &hellip;</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; width:107px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td colspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:100px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:99px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:73px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:77px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; width:111px"> 			<p style="text-align:center"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">&hellip;</span></span></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:107px">&nbsp;</td> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:92px">&nbsp;</td> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:8px">&nbsp;</td> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:99px">&nbsp;</td> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:73px">&nbsp;</td> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:73px">&nbsp;</td> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:77px">&nbsp;</td> 			<td style="border-bottom:none; border-left:none; border-right:none; border-top:none; width:111px">&nbsp;</td> 		</tr> 	</tbody> </table>  <p style="margin-left:58px; text-align:justify">&nbsp;</p>  <ol start="6"> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Описать алгоритмические связи показателей (вычисляемые атрибуты) при необходимости.</span></span></span></span></li> 	<li style="text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Спроектировать перечень <strong>типовых запросов</strong> и <strong>отчетов</strong> по представленной модели (манипуляционная часть) согласно описанию предметной области.</span></span></span></span></li> </ol>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Результаты моделирования/реализации объектов базы данных/приложения:</strong></span></span></p>  <ol style="list-style-type:upper-roman"> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Название создаваемой БД.</span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Состав реквизитов сущностей в виде &quot;название сущности (перечень реквизитов)&quot;.</span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Схема инфологической модели данных БД в нотации Питера Чена.</span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Схема инфологической модели данных БД, выполненная в среде <strong><span style="color:black">CA</span> </strong><strong><span style="color:black">ERwin</span> </strong><strong><span style="color:black">Process</span> </strong><strong><span style="color:black">Modeler</span><span style="color:black">, в нотации </span></strong><strong><span style="color:black">IDEF</span><span style="color:black">1</span></strong><strong><span style="color:black">X</span><span style="color:black">).</span></strong></span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Описание атрибутов сущностей и ограничений на данные (таблица 1).</span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Алгоритмические связи для вычисляемых данных (при наличии).</span></span></li> 	<li style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Перечень спроектированных (типовых) запросов и отчетов. </span></span></li> </ol>  <p style="margin-left:48px; text-align:justify">&nbsp;</p>  <p style="margin-left:48px; text-align:justify"><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><strong><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Выводы</span></span></strong></span></span></p>  <p style="text-align:left"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Отчет по лабораторной работе</strong></span></span></p>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Отчет по лабораторной работе представляется в печатном виде в формате, предусмотренном шаблоном отчета по лабораторной работе. Защита отчета проходит в форме доклада обучающегося по выполненной работе и ответов на вопросы преподавателя.</span></span></p>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">В случае если оформление отчета и доклад обучающегося во время защиты соответствуют указанным требованиям, обучающийся получает максимальное количество баллов.</span></span></p>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Основаниями для снижения количества баллов в диапазоне от <strong>max </strong>до <strong>min </strong>являются:</span></span></p>  <ul> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">небрежное выполнение,</span></span></span></span></li> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">низкое качество графического материала (небрежное представление схем моделируемых объектов),</span></span></span></span></li> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">выполнение практического задания не в полном объеме;</span></span></span></span></li> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">некорректные результаты моделируемых объектов (от 100 до 60%)<em>.</em></span></span></span></span></li> </ul>  <p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Отчет не может быть принят и подлежит доработке в случае:</span></span></p>  <ul> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">несоответствие результатов работы индивидуальному практическому заданию,</span></span></span></span></li> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">отсутствия необходимых разделов,</span></span></span></span></li> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">отсутствия необходимого графического материала,</span></span></span></span></li> 	<li><span style="font-size:11pt"><span style="font-family:Calibri,sans-serif"><span style="font-size:12.0pt"><span style="font-family:&quot;Times New Roman&quot;,serif">некорректных результатов моделируемых объектов (менее чем на 60%).</span></span></span></span></li> </ul>  <p style="margin-left:34px; text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Шкала оценивания и критерии оценки (на примере лабораторной работы 2):</strong></span></span></p>  <p style="margin-left:58px; text-align:justify">&nbsp;</p>  <table cellspacing="0" class="Table" style="border-collapse:collapse; border:none"> 	<tbody> 		<tr> 			<td rowspan="2" style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:2px solid black"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>№ п/п</strong></span></span></p> 			</td> 			<td rowspan="2" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:2px solid black"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Показатели</strong></span></span></p> 			</td> 			<td colspan="3" style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:2px solid black"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif"><strong>Оценка (уровень)</strong></span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">высокий</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">средний</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">низкий</span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">1</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Уровень оформления отчета</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,6</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,5</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,4</span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">2</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Навыки устного представления результатов работы</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,4</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,3</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,2</span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">3</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Соответствие схемы инфологической модели данных в нотации Питера Чена заданной предметной области</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,9</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,75</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,5</span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">4</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Соответствие схемы инфологической модели данных в нотации IDEF1X заданной предметной области</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,9</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,75</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,5</span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">5</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Корректность определения структурной и целостной части инфологической модели данных (по таблице 1)</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,4</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,35</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:center"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">0,3</span></span></p> 			</td> 		</tr> 		<tr> 			<td style="border-bottom:2px solid black; border-left:2px solid black; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">6</span></span></p> 			</td> 			<td style="border-bottom:2px solid black; border-left:none; border-right:2px solid black; border-top:none; vertical-align:top"> 			<p style="text-align:justify"><span style="font-size:12pt"><span style="font-family:&quot;Times New Roman&quot;,serif">Корректность определения целостной части инфологической модели данных (по таблице 1)</span></span></', true, 25, 12, 20);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (6, 'Задача (задание)', 'Булочка в тесте', '<p>Съесть мильон плюшек</p><figure class="table"><table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure>', false, NULL, 100, 10);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (7, 'ывыывывыв', 'ывывыв', 'ывывыв', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (8, 'ddfdf', 'dfdf', 'ывывыв', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (9, 'string', 'string', 'string', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (10, 'string', 'wewewe', 'string', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (11, 'wrerewrwerewr', 'werwerewrewr', 'string', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (12, 'wrerewrwerewr', 'wssdsdsderwerewrewr', 'string', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (13, 'wrerewrwerewr', 'ывывывыв', 'string', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (14, 'wrerewrwerewr', 'ывывывывывыв', 'string', true, 0, 0, 0);
INSERT INTO public.workprogramsapp_evaluationtool VALUES (15, 'wrerewrwerewr', 'ывывыууууувывывыв', 'string', true, 0, 0, 0);


--
-- Data for Name: workprogramsapp_fieldofstudy; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_fieldofstudy VALUES (1, '09.04.03 Прикладная информатика', 'bachelor', 'internal', NULL, NULL, NULL);


--
-- Data for Name: workprogramsapp_fieldofstudyworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_implementationacademicplan; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_indicator; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_indicator VALUES (1, 'ПКС-1.1.1', 'Разрабатывает технико-коммерческое предложение и участвует  в его защите', 1);
INSERT INTO public.workprogramsapp_indicator VALUES (2, 'ПКС-1.1.2', 'Разрабатывает методику выполнения аналитических работ и управляет аналитическими ресурсами и компетенциями', 1);
INSERT INTO public.workprogramsapp_indicator VALUES (3, 'ПКС-1.3.2', 'Выбирает методы и инструментальные средства для проведения аналитических работ', 1);
INSERT INTO public.workprogramsapp_indicator VALUES (4, 'ПКС-1.3.3', 'Разрабатывает и проводит оценку используемых моделей', 1);


--
-- Data for Name: workprogramsapp_indicatorworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_onlinecourse; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_onlinecourse VALUES (181, 'Финансовая экономика
', 'online.edu.ru', ' Финансовые рынки иинструменты', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4086');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (1, 'Теория игр', 'online.edu.ru', 'Стратегические взаимодействия', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3476');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (2, 'Методы обработки навигационной измерительной информации', 'online.edu.ru', 'В курсе рассматриваются следующие...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3481');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (3, 'Методы вычислительной математики', 'online.edu.ru', 'Элементарная теория погрешностей.', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3483');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (4, 'Функциональное программирование: базовый курс', 'online.edu.ru', 'В курсе рассматриваются следующие...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3487');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (5, 'Веб-программирование', 'online.edu.ru', 'В курсе рассматриваются следующие...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3490');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (18, 'Всемирная юридическая история. Часть 2', 'online.edu.ru', 'Цель данного курса лекций заключается...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3596');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (20, 'Живая Земля
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3601');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (7, 'Основы астрономии', 'online.edu.ru', 'Астрономия в мире и в России...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3572');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (8, 'Биофизика', 'online.edu.ru', 'Молекулярная биофизика...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3576');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (9, 'Математический анализ. Теория функций одной переменной', 'online.edu.ru', 'Элементы теории множеств...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3578');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (10, 'Как химия объясняет и изменяет окружающий мир', 'online.edu.ru', 'Часть I. Как химия объясняет мир...', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3580');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (19, 'Юридическая поддержка стартапов
', 'online.edu.ru', 'Предпринимательская деятельность...  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3599');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (6, 'Аналитическая геометрия
', 'online.edu.ru', 'Лекция 1. Определение вектора...  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3570');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (11, 'Общая геология. Планета Земля: образование, строение, эволюция
', 'online.edu.ru', '  1. Образование Вселенной, Галактики Млечного пути, Солнечной системы и планет. 2. Метеориты, астероиды, кометы. Их падение на Землю в прошлом, настоящем и будущем. Возможности предотвращения падения астероидов и комет. 3. Сейсмологический метод – основа изучения внутреннего строения Земли и геосферы. 4. Абсолютный и относительный возраст горных пород Земли. Тектоника литосферных плит – революция в геологии XX века. 5. Экзогенные процессы и их роль в формировании облика поверхности Земли. Выветривание, эоловые процессы. 6. Геологическая деятельность поверхностных текучих и подземных вод. Карстовые процессы. 7. Геологическая деятельность снега и льда. Процессы в криолитозоне. Оледенения. 8. Геологическая деятельность океанов и морей. 9. Вулканы, их типы. Катастрофические извержения, их последствия, прогноз. 10. Землетрясения: причины, примеры, связь с геологическим строением Земли, прогноз. 11. Ресурсы Земли, полезные ископаемые, прогноз.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3582');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (12, 'Современные экологические проблемы и устойчивое развитие
', 'online.edu.ru', '   Раздел 1. Биосферные ограничения экологического развития   Тема 1. Введение.  Тема 2. Основы общей экологии.   Раздел 2. Антропогенное воздействие на биосферу   Тема 3. Проблема роста народонаселения мира.  Тема 4. Обеспечение населения Земли продовольствием.  Тема 5. Потребление природных ресурсов. Минеральные и водные ресурсы.  Тема 6. Условия энергетического обеспечения прогресса.  Тема 7. Глобальные проблемы изменения климата.  Тема 8. Экологические особенности получения электроэнергии различными способами.  Тема 9. Уроки Чернобыля.  Тема 10. Загрязнение окружающей среды.   Раздел 3. Устойчивое развитие человечества и экологическая политика   Тема 11. Экологическая политика: правовые, экономические и организационные механизмы обеспечения экологической безопасности.  Тема 12. Международное сотрудничество и устойчивое развитие.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3584');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (13, 'Электромагнетизм
', 'online.edu.ru', '   Лекция 1.  Электромагнитное взаимодействие и его место среди других взаимодействий в природе. Развитие физики электричества в работах М.В.Ломоносова. Электрический заряд. Микроскопические носители заряда. Опыт Милликена. Закон сохранения электрического заряда. Электростатика. Закон Кулона и его полевая трактовка. Вектор напряженности электрического поля. Принцип суперпозиции электрических полей.   Лекция 1.  Поток вектора напряженности электрического поля. Электростатическая теорема Остроградского–Гаусса, ее представление в дифференциальной форме. Потенциальность электростатического поля. Потенциал. Нормировка потенциала. Связь вектора напряженности электростатического поля и потенциала. Работа сил электростатического поля. Потенциал системы зарядов.   Лекция 3.  Циркуляция вектора напряженности электрического поля. Теорема о циркуляции, ее представление в дифференциальной форме. Уравнения Пуассона и Лапласа. Электрический диполь. Потенциал и напряженность поля диполя.   Лекция 4.  Проводники в электростатическом поле. Электростатическая индукция. Напряженность поля у поверхности и внутри проводника. Распределение заряда по поверхности проводника. Электростатическая защита. Связь между зарядом и потенциалом проводника. Электроемкость. Конденсаторы. Емкость плоского, сферического и цилиндрического конденсаторов. Проводящий шар в однородном электростатическом поле.   Лекция 5.  Диэлектрики. Свободные и связанные заряды. Вектор поляризации. Связь вектора поляризации со связанными зарядами. Вектор электрической индукции в диэлектрике. Диэлектрическая восприимчивость и диэлектрическая проницаемость и вещества. Материальное уравнение для векторов электрического поля. Теорема Остроградского – Гаусса для диэлектриков. Ее дифференциальная форма. Граничные условия для векторов напряженности и электрической индукции. Диэлектрический шар в однородном электрическом поле.   Лекция 6.  Энергия системы электрических зарядов. Энергия взаимодействия и собственная энергия. Энергия электростатического поля и ее объемная плотность. Энергия электрического диполя во внешнем поле. Пондеромоторные силы в электрическом поле и методы их вычислений. Связь пондеромоторных сил с энергией системы зарядов.   Лекция 7.  Электронная теория поляризации диэлектриков. Локальное поле. Неполярные диэлектрики. Формула Клаузиуса – Моссотти. Полярные диэлектрики. Функция Ланжевена. Поляризация ионных кристаллов. Электрические свойства кристаллов. Пироэлектрики. Пьезоэлектрики. Прямой и обратный пьезоэлектрический эффект и их применение. Сегнетоэлектрики. Доменная структура сегнетоэлектриков. Гистерезис. Точка Кюри. Применение сегнетоэлектриков.   Лекция 8.  Постоянный электрический ток. Сила и плотность тока. Линии тока. Электрическое поле в проводнике с током и его источники. Уравнение непрерывности. Условие стационарности тока. Электрическое напряжение. Закон Ома для участка цепи. Электросопротивление. Закон Ома в дифференциальной форме. Удельная электропроводность вещества.   Лекция 9.  Токи в сплошных средах. Заземление. Работа и мощность постоянного тока. Закон Джоуля – Ленца и его дифференциальная форма. Сторонние силы. Электродвижущая сила. Закон Ома для замкнутой цепи. Разветвленные цепи. Правила Кирхгофа. Примеры их применения.   Лекция 10.  Магнитостатика. Взаимодействие токов. Элемент тока. Закон Био – Савара – Лапласа и его полевая трактовка. Вектор индукции магнитного поля. Действие магнитного поля на ток. Закон Ампера. Теорема о циркуляции вектора индукции магнитного поля. Дифференциальная форма теоремы о циркуляции. Вихревой характер магнитного поля. Уравнение div B = 0. Понятие о векторном потенциале. Релятивистская природа магнитных взаимодействий.   Лекция 11.  Элементарный ток и его магнитный момент. Магнитное поле элементарного тока. Элементарный ток в магнитном поле. Магнитное поле движущегося заряда. Взаимодействие движущихся зарядов. Сила Лоренца. Эффект Холла.   Лекция 12.  Поток вектора магнитной индукции (магнитный поток). Коэффициент самоиндукции (индуктивность). Коэффициент взаимной индукции двух контуров. Потенциальная функция тока. Силы, действующие на контур с током. Взаимодействие двух контуров с током.   Лекция 13.   Электромагнитная индукция. Закон электромагнитной индукции Фарадея и его дифференциальная форма. Правило Ленца.   Лекция 14.  Магнетики. Понятие о молекулярных токах. Вектор намагниченности вещества и его связь с молекулярными токами. Вектор напряженности магнитного поля.   Лекция 15.  Классификация магнетиков. Диамагнетики, парамагнетики и ферромагнетики. Классическое описание диамагнетизма. Ларморова прецессия.   Лекция 16.  Ферромагнетики. Спонтанная намагниченность и температура Кюри. Доменная структура. Гистерезис намагничивания, кривая Столетова.   Лекция 17.  Квазистационарные токи. Условия квазистационарности. Переходные процессы в RC- и LC-цепях.   Лекция 18.  Вынужденные колебания в контуре. Процесс установления вынужденных колебаний.   Лекция 19.  Резонанс напряжений. Напряжения и токи при резонансе.   Лекция 20.  Техническое применение переменных токов. Генераторы и электродвигатели. Трехфазный ток.   Лекция 21.   Высокочастотные токи. Скин-эффект. Толщина скин-слоя.   Лекция 22.  Классическая теория электронной проводимости Друде – Лоренца.   Лекция 23.  Полупроводники.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3586');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (14, 'Генетика
', 'online.edu.ru', '   Лекция 1.  Менделизм. Опыты Г. Менделя и его последователей Гибридологический анализ. Моногибридное скрещивание, доминирование одного из родительских признаков в F1 и расщепление в Е2 (3:1). Анализирующее скрещивание. Наследственный фактор - дискретная единица наследственности - ген. Понятие «аллель гена». Утверждение принципа, что наследуются не признаки, а аллели генов, контролирующие их развитие.       Лекция 2.  Дигибридное скрещивание Доминирование в F1 и расщепление в F2 (9А-В-: ЗА-вв: 3ааВ-: 1 аавв). Независимое комбинирование и независимое наследование признаков. Цитологические основы явления. Неаллельное взаимодействие генов. Ген и признак. Пенетрантность и экспрессивность признака. Норма реакции генотипа. Формально-генетический подход анализа наследования признаков. Типы взаимодействия неаллельных генов: комплементарное, эпистатическое, полимерия.         Лекция 3.  Хромосомная теория наследственности Т.Г. Моргана Наследственные факторы - гены локализованы в хромосомах. Гены расположены в хромосоме в линейном порядке и составляют группу сцепления генов. Между гомологичными хромосомами может происходить обмен участками (кроссинговер), что приводит к нарушению сцепления генов, т.е. генетической рекомбинации. Величина кроссинговера есть функция расстояния между генами на хромосоме. Генетические карты характеризуют относительные расстояния между генами, выраженные в процентах кроссинговера.         Лекция 4.  Теория гена. Сложное строение гена. Функциональный и рекомбинационный тесты на аллелизм.         Лекция 5.  Генетика пола Пол - сложный, генетически контролируемый признак. Генетические) и эпигенетические факторы детерминации пола. Гены, контролирующие детерминацию и дифференцировку пола. Хромосомное определение пола. Основная функция половых хромосом (X,Y и W,Z) - поддержание полового диморфизма и первичного соотношения полов (N♂/N♀=1). Наследование признаков, сцепленных с полом. Реципрокные скрещивания. Отсутствие единообразия у гибридов F1, и наследование признака по типу «крест-накрест». Первичное и вторичное нерасхождение половых хромосом. Гинандроморфизм.         Лекция 6.  Мутационная и модификационная изменчивость Наследственная изменчивость – мутационная и комбинативная – характеризуется изменением генотипа. Модификационная (ненаследственная изменчивость) видоизменяет фенотип организма в пределах нормы реакции генотипа. Мутация – дискретное изменение признака, передающееся по наследству в ряду поколений организмов и клеток. Классификация мутаций: по структуре генетического материала, по месту локализации, по типу аллельного, по причине возникновения. Генетические последствия загрязнения окружающей среды. Мутагенные факторы Мониторинг уровня частоты различных типов мутаций в одних и тех же географических точках. Скрининг мутагенной активности лекарственных препаратов, пищевых добавок, новых промышленных химических соединений. Размах проявления модификационной изменчивости организма при неизменном генотипе — норма реакции.         Лекция 7.  Мутационный процесс: спонтанный и индуцированный Мутационный процесс характеризуется всеобщностью и причинностью, статистичностью и определённой частотой, протяжённостью во времени. Спонтанные мутации возникают в результате ошибок в работе ферментов матричного синтеза ДНК. Генетический контроль мутационного процесса. Гены-мутаторы, гены-антимутаторы. Системы репарации генетических повреждений. Закономерности индуцированного мутагенеза (радиационного, химического и биологического). Дозовая зависимость, временной характер, мощность дозы (концентрация), предмутационные изменения генетического материала и др. Методы количественного учёта мутаций. Молекулярные механизмы возникновения генных мутаций и хромосомных перестроек.        «Адаптивный» мутагенез. Проблема наследования приобретаемых признаков.  Лекция 8.  Генетика популяций Любую популяцию составляют особи, отличающиеся в той или иной мере по генотипу и фенотипу. Для понимания генетических процессов, протекающих в популяции, необходимо знать: 1) какие закономерности управляют распределением генов между особями; 2) изменяется ли это распределение из поколения в поколение, и если изменяется, то каким образом. Согласно формуле Харди-Вайнберга, в идеальной популяции, находящейся в равновесии, доли разных генотипов должны неограниченно долго оставаться постоянными. В реальных популяциях эти доли могут изменяться из поколения в поколение вследствие ряда причин: малочисленность популяции, миграции, отбор мутации. Генофонд популяции, геногеография (А.С. Серебровский), генетическая гетерогенность природных популяций (С.С. Четвериков), генетико-автоматические процессы (Н.П. Дубинин).       Лекция 9, 10.  Генетика развития Современная биология развития представляет собой сплав эмбриологии, генетики и молекулярной биологии. Мутации генов, контролирующих разные этапы индивидуального развития, позволяют выявить время и место действия нормального аллеля данного гена и идентифицировать продукт этого гена в виде и - РНК, фермента (полипептида) или структурного белка. Генетический контроль детерминации и дифференцировки пола. Модельные объекты генетики развития: Drosophila melanogaster - плодовая мушка, Caenorhabditis elegans – круглый червь, нематода, Xenopus laevis - шпорцевая лягушка, Mus musculus - лабораторная мышь, Arabidopsis Thaliana Проблемы генетики развития: анализ дифференциальной активности генов, активность. Гомеозисные мутации, их роль на ранних этапах онтогенеза. Эпигенетика индивидуального развития и её перспективы. Генетический импринтинг. Роль апоптоза (генетически программированной гибели клеток) и некроза в ходе индивидуального развития многоклеточных организмов. АЛЛОФЕННЫЕ МЫШИ – генетические мозаики. В отличие от животных у растений из соматических клеток сформированного организма можно получить взрослое полноценное растение (морковь, табак, томаты), способное к половому размножению. Из изолированной клетки под действием растительных гормонов можно получить целое растение. Проблема репрограммирования генома в дифференцированных клетках животных. Эмбриональные стволовые клетки (ЭСК). Тотипотентность, плюрипотентность и мультипотентность разных типов клеток. Получение индуцированных плюрипотентных клеток фибропластов человека (iPS) с помощью индукторов репрограммирования транскрипционных факторов Oct4, Sox2, c-Mic, Klf4 и Nanog. Клонирование позвоночных животных (овечка Долли, 1997). В настоящее время клонированы десятки видов животных из класса млекопитающих (мышь, корова, кролик, свинья, овца, коза, обезьяна (макака-резус) и др.).       Лекция 11, 12.  Генетика человека. Биосоциальная природа человека. Антропогенетика и медицинская генетика. Методы исследования: генеалогический, близнецовый, цитологический, биохимический, молекулярно-генетический, математический и др. Менделирующие (моногенные и мультифакториальные) полигенные признаки. Нормальный кариотип человека. Дифференциальное окрашивание хромосом и Fish–метод. Хромосомные аберрации и связанные с ними генетические синдромы. Методы картирования генома человека. Гибридизация соматических клеток человека и мыши. Секвенирование генома человека (3,5х109 п.о.). Геномика (структурная, функциональная, фармакогеномика, этногеномика и т.д.). Генетический полиморфизм – основа биоразнообразия человека Типы полиморфизма ДНК (по числу и распределению мобильных генетических элементов; по числу копий тандемных повторов и др). Медицинская генетика. Развитие медико-генетического консультирования. Пренатальная диагностика (кариотипирование, ДНК-маркеры, биохимические и иммунологические маркеры, прогноз для потомства). Демографическая генетика. Евгеника, генотерапия, генетическая паспортизация (проблемы и спорные вопросы).         Лекция 13.  Генетические основы селекции Селекция растений и животных. Исходный материал (дикие формы, районированные сорта растений и заводские породы животных, инбредные линии). Гибридизация (методы скрещивания): межвидовое, межпородное, внутрипородное (аутбридинги инбридинг), промышленное скрещивание. Методы отбора (массовый – индивидуальный, по фенотипу- по генотипу, по родословной – по качеству потомства). Гибридная кукуруза (простые и двойные межлинейные гибриды). Межлинейные яичные и мясные гибриды кур. Явления гетерозиса и инцухт - депрессии. Межродовой фертильный гибрид редьки и капусты (рафанобрассика). Биотехнология и использование трансгенных организмов.    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3588');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (25, 'Физиология центральной нервной системы
', 'online.edu.ru', '   Тема 1.  Нервная клетка. Цепи и сети нейронов ЦНС. Рефлекторная дуга. Краткая характеристика основных отделов ЦНС и их функций  Тема 2.  Химический состав живых организмов. Структура и разнообразие белков. Внутреннее строение нейронов. Потенциал покоя нервных клеток.  Тема 3.  Потенциал действия нервных клеток, порог запуска и фазы. Свойства электрочувствительных Na+ и К+-каналов. Проведение ПД, роль глиальных клеток. Пейсмекеры; местные анестетики; электрические синапсы.  Тема 4.  Химический синапс. Жизненный цикл медиатора: синтез, выброс в синаптическую щель, взаимодействие с рецепторами, инактивация. Постсинапти-ческие потенциалы и запуск ПД. Вторичные посредники. Агонисты и антагонисты медиаторов.  Тема 5.  Ацетилхолин (Ацх), его синтез. Никотиновые и мускариновые рецепторы, их антагонисты. Нервно-мышечный синапс. Роль Ацх в ВНС и ЦНС. Никотиновая зависимость. Ацх-эстераза и ее блокаторы.  Тема 6.  Норадреналин (NЕ), его синтез. Типы адренорецепторов, их агонисты и антагонисты. Симпатические эффекты NЕ (регуляция функций внутренних органов). NЕ в головном мозге: роль голубого пятна. NЕ, адреналин и реакция на стресс.  Тема 7.  Глутаминовая кислота и ГАМК – главные медиаторы ЦНС: синтез, типы рецепторов, инактивация. Нарушение баланса медиаторов-аминокислот как причина многих отклонений деятельности мозга. Ноотропы, транквилизаторы, снотворные и антиэпилептические препараты. СДВГ.  Тема 8.  Дофамин: синтез, типы рецепторов. Черная субстанция; паркинсонизм и его лечение. Шизофрения и нейролептики. Психомоторные стимуляторы. Серотонин: периферические и центральные эффекты. 5-НТ-рецепторы, их разнообразие и функции. МАО и антидепрессанты.  Тема 9.  Глицин и гистамин – медиаторы ЦНС. Энкефалины и опиоиды. Вещество Р, другие регуляторные пептиды. Аденозин и кофеин. Каннабиноиды. Факторы роста нервов (нейротрофины), стволовые клетки нервной ткани. Мозг и алкоголь.  Тема 10.  Продолговатый мозг и мост: дыхательный и сосудодвигательный центры; проведение вкусовых, слуховых и вестибулярных сигналов. Центры сна и бодрствования, стадии сна. Средний мозг и ориентировочный рефлекс. Экстрапирамидные тракты. Терморегуляторная функция гипоталамуса.  Тема 11.  Гипоталамус и гипофиз: нейроэндокринная регуляция. Либерины, статины, тропные гормоны. Влияние гормонов на функции ЦНС. Гипоталамус и миндалина: биологические потребности. Центры голода, жажды, полового и родительского поведения, страха, агрессии.  Тема 12.  Центры подкрепления, прилежащее ядро. Кора больших полушарий: механизмы обучения; гиппокамп. Миндалина, ассоциативная лобная кора, поясная извилина: запуск и оценка результатов поведения. Ассоциативная теменная кора: центры речи и мышления.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3611');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (15, 'История классической японской литературы
', 'online.edu.ru', '  1.Введение. Краткое знакомство с методикой и задачами курса.  2.Особенности японского мифологического сознания, синкретические памятники письменности 8в., эволюция ранних текстов от магической речи к ораторской и художественной.  3.Процесс формирования и развития древней поэзии в антологии «Манъёсю».  4.Мировоззрение родовой аристократии.  Аварэ  как высшая категория в системе ценностей эпохи Хэйан. Роль раннесредневекового буддизма в литературной картине мира.  5.Хэйанская проза на  вабуне . «Традиционные и вымышленные» повести, истории о поэтах, эго-беллетристика женского стиля (дневники, мемуары, эссе, путевые записи).  6.Проблема раннесредневекового романа. «Повесть о дупле» и «Повесть о принце Гэндзи». Высшая точка развития культуры аристократии.  7.Жанры прозы периода декаданса: классицистские  гико-моногатари,  дидактические рассказы  сэцува  и исторические повести  рэкиси-моногатари  как свидетельство зарождения средневековой идеологии.  8.Китаеязычная проза и поэзия раннего средневековья.  9.Возникновение поэтического канона. Первая императорская антология  вака  «Кокинсю». Собрания эпигонского характера.  10.Формирования средневекового поэтического стиля в творчестве Фудзивара-но Сюндзэй и Сайгё:-хоси.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3590');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (16, 'Язык, культура и межкультурная коммуникация
', 'online.edu.ru', '  Курс состоит из 10 лекций:   Обоснование курса. Определение терминов-понятий.  Барьеры на пути коммуникации: языковой и культурный.  Преодоление барьеров. Преподавание и изучение иностранных языков. Перевод. Комментирование  Соотношение языка и культуры. Язык – зеркало, хранитель, орудие культуры.  Война и мир языков и культур.  Язык, культура и национальный характер.  Язык и идеология.  Язык, культура и национальная безопасность.  Судьбы национальных языков и культур в эпоху глобализации.  Глобальный язык. Чем этот статус грозит его носителям – англоязычным народам .    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3592');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (17, 'Всемирная юридическая история. Часть 1
', 'online.edu.ru', '  Вводная лекция  Тема 1. Государственность и правовая культура Древней Греции  Тема 2. Государственность и правовая культура Древнего Рима  Тема 3. Основные черты феодального государства и права в средневековой Западной Европе  Тема 4. Государственность и правовая культура средневековой Франции  Тема 5. Государственность и правовая культура Англии в XI-XV вв.  Тема 6. Государственность и правовая культура средневековой Германии  Тема 7. Духовно-рыцарские ордена в политической системе средневековой Европы  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3594');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (21, 'Управление сотрудниками в инновационной экономике
', 'online.edu.ru', '  Лекция 1: Новая парадигма управления сотрудниками в инновационной экономике  Лекция 2: Лидерский менеджмент  Лекция 3: Что такое лидерство?  Лекция 4: Интеллектуальные сотрудники – вызов менеджменту  Лекция 5: Новые задачи менеджмента персонала  Лекция 6: Сущность стратегического управления сотрудниками  Лекция 7: Развитие сотрудников и их компетенций  Лекция 8: Современные тенденции развития стратегического управления сотрудниками  Лекция 9: Корпоративная культура в современном менеджменте  Лекция 10: Формирование эффективной корпоративной культуры  Лекция 11: Практика формирования эффективной корпоративной культуры  Лекция 12: Особенности корпоративной культуры в России  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3603');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (22, 'Математический анализ. Интегрирование и функции многих переменных
', 'online.edu.ru', '  Лекция 1. Неопределенный интеграл. Основные понятия. Лекция 2. Интегрирование рациональных дробей. Лекция 3. Интегрирование различных типов функций. Лекция 4. Определенный интеграл. Основные понятия. Лекция 5. Классы интегрируемых функций. Свойства определенного интеграла. Лекция 6. Формула Ньютона-Лейбница. теоремы о среднем. Лекция 7. Несобственный интеграл. Лекция 8. Геометрические приложения определенного интеграла. Длина кривой и площадь области. Лекция 9. Геометрические приложения определенного интеграла. Объем тела и площадь поверхности вращения. Лекция 10. Приближенные методы вычисления определенного интеграла. Лекция 11. Понятие функции многих переменных. Лекция 12. Непрерывность функции многих переменных. Лекция 13. Дифференцирование функции многих переменных. Лекция 14. Производная по направлению и градиент. Производные и дифференциалы высших порядков. Лекция 15. Формула Тейлора для функции многих переменных. Экстремум функции многих переменных. Лекция 16. Функции, заданные неявно. Система функциональных уравнений. Лекция 17. Взаимно однозначные отображения. Задача о функциональной зависимости. Лекция 18. Условный экстремум функции многих переменных.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3605');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (23, 'Механика
', 'online.edu.ru', '   Введение  В.1 Пространство и время в механике Ньютона В.2 Система отсчета   Глава 1.  Кинематика и динамика простейших систем П.1.1. Кинематика материальной точки и простейших систем П.1.2. Законы Ньютона П.1.3. Законы, описывающие индивидуальные свойства сил   Глава 2.  Законы сохранения в простейших системах П.2.1. Закон сохранения импульса П.2.2. Механическая энергия П.2.3. Связь законов сохранения с однородностью пространства и времени   Глава 3.  Неинерциальные системы отсчета П.3.1. Неинерциальные системы отсчета. Силы инерции П.3.2. Проявление сил инерции на Земле П.3.3. Принцип эквивалентности   Глава 4.  Основы релятивистской механики П.4.1. Пространство и время в теории относительности П.4.2. Преобразования Лоренца П.4.3. Следствия преобразований Лоренца П.4.4. Интервал П.4.5. Сложение скоростей П.4.6. Уравнение движения П.4.7. Импульс, энергия и масса в теории относительности   Глава 5.  Кинематика и динамика твердого тела П.5.1. Кинематика твердого тела П.5.2. Динамика твердого тела П.5.3. Кинетическая энергия твердого тела П.5.4. Гироскопы, волчки   Глава 6.  Основы механики деформируемых тел П.6.1. Деформации и напряжения в твердых телах П.6.2. Коэффициент Пуассона П.6.3. Связь между модулем Юнга и модулем сдвига П.6.4. Энергия упругих деформаций   Глава 7.  Колебания П.7.1. Свободные колебания систем с одной степенью свободы П.7.2. Вынужденные колебания П.7.3. Сложение колебаний П.7.4. Колебания в связанных системах П.7.5. Нелинейные колебания П.7.6. Параметрические колебания П.7.7. Автоколебания   Глава 8.  Волны П.8.1. Распространение импульса в среде. Волновое уравнение П.8.2. Плотность и поток энергии в бегущей волне. Вектор Умова П.8.3. Отражение волн, моды колебаний П.8.4. Элементы акустики П.8.5. Ударные волны   Глава 9.  Основы гидро и аэромеханики П.9.1. Основы гидро- и аэростатики П.9.2. Стационарное течение несжимаемой жидкости П.9.3. Ламинарное и турбулентное течение. Обтекание тел жидкостью или газом  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3607');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (24, 'Медицинская биофизика: молекулы и болезни
', 'online.edu.ru', '   Раздел 1.  Представлены современные методы иоригинальные результаты, характеризующие важную роль потенциал-зависимых илиганд-оперируемых ионных каналов вформировании возбуждения клетки, генерации потенциалов действия внорме ипри патологии. Анализ ионных токов, активности каналов исостояния мембраны при проведении возбудимой клеткой серии импульсов. Роль следовых потенциалов. Активация ритмоводителей внейронах при термо-, хемо- имеханостимуляции.   Раздел 2.  Представлена молекулярно-биологическая ифункциональная классификация ионных переносчиков. Обсуждается термодинамика икинетика ионных переносчиков, атакже ихфизиологическое значение. Анализируется универсальная роль натрий-калий-хлор-котранспорта как регулятора сосудистого тонуса, переносчиков нейротрансмиттеров иихрецепторов вклетках нервной системы, роль хлор-сопряжённых транспортеров вфункционировании нейронов ислухового аппарата ивпатогенезе гипертонической болезни.   Раздел 3.  Мембранный насос— транспортная АТФаза: классификация мембранных АТФаз (АТФазы Р-типа, V(F)-типа, АBC-типа), ихлокализация ифункции. Рассмотрена структура АТФаз Р-типа, ихэволюция, механизм функционирования напримере Na, K-АТФазы, значение кардиотонических стероидов вразвитии патологий. Обсуждается роль малоизвестных АТРаз Р-типа вразвитии патологии (болезнь Коновалова-Вильямса). Н, K-АТРазы, ихразнообразие ироль всекреции соляной кислоты вжелудке, лекарственные препараты— ингибиторы Н, K-АТРазы иихучастие влечении заболеваний желудочно-кишечного тракта. Cа-АТРаза эндоплазматического ретикулума, структура имеханизм функционирования, еёроль вфизиологии ипатологии. Функции АТФаз АВС-типа: устойчивость клекарственным препаратам. АТФазы V-типа: сравнение сАТФазами F-типа, структура, функции, распределение фермента вклетке ипатологии. АТФазы V-типа: роль фермента вразвитии остеопороза, формировании метастазов, развитии иммунного ответа лимфоцитов.   Раздел 4.  Свободно-радикальные процессы при патологии. Роль активных форм кислорода. Цепные реакции. Антиокислительный статус: ферменты иосновные антиоксиданты. Роль супероксиддисмутазы икаталазы при патологии сердечно-сосудистой системы, онкологии игормональных сдвигах.   Раздел 5.  Современные методологии иметоды медицинской биофизики. Оптическая когерентная томография (ОКТ): применение ипринцип. Применения новой модификации ОКТ, кросс-поляризационной ОКТ для качественной иколичественной оценки состояния основных структурных компонентов атеросклеротической бляшки ивыявления среди них нестабильных («уязвимых») бляшек. Применение ОКТ изображения бляшек, разработка иприменение новых способов количественной оценки рассеивающих иполяризационных характеристик тканей кожи. Методы спектроскопии комбинационного рассеяния, пикосекундной флуориметрии, атомно-силовой микроскопии, конфокальной микроскопии, атакже рассеяния наноразмерных комплексов ирегистрации активности ферментов (натриевый насос). Наноплазмоника иСЕРС вбиомедицинских исследованиях.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3609');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (26, 'Классическая персидская литература
', 'online.edu.ru', '   Лекция 1: (Вводная) Основные факторы формирования литературы на новоперсидском языке.   Лекция 2:  Творчество Рудаки и его современников.   Лекция 3:  Эпопея Фирдоуси «Шах-наме» и ее место в истории литературы иранских народов.   Лекция 4:  Придворная поэзия XI в. (Унсури, Фаррухи, Манучихри). Основные функции, принципы творчества.   Лекция 5:  Становление жанра любовно-романического эпоса в персидской литературе XI в.   Лекция 6:  Развитие литературы религиозных течений (суфизма, исмаилизма). Первые суфийские поэты.   Лекция 7:  Насир-и Хосров и развитие дидактических жанров персидской поэзии.   Лекция 8:  Развитие придворной поэзии в XII в. (Муиззи, Анвари, Хакани): характер проявления авторской индивидуальности.   Лекция 9:  Творчество Санаи – первого великого поэта-мистика.   Лекция 10:  Низами и его «Пятерица»: роль в формировании региональной литературной традиции.   Лекция 11:  Омар Хайям: загадки «Рубайата».   Лекция 12:  Творчество Фарид ад-Дина Аттара: эпос, лирика, агиография.   Лекция 13:  Саади и его эпоха.   Лекция 14:  Становление персоязычной литературы Индии: творчество Амира Хосрова Дехлеви.   Лекция 15:  Поэтические откровения Джалал ад-Дина Руми.   Лекция 16:  Хафиз: поэзия на все времена.   Лекция 17:  Абд ар-Рахман: «последний классик» или «двуликий Янус»?   Лекция 18:  Персидская классическая проза XI-XII вв.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3613');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (27, 'Ботаника: низшие растения
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3615');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (28, 'Физиология растений
', 'online.edu.ru', '  Лекция 1. Что такое физиология растений. Растения и мы. Лекция 2. Фотосинтез I. пигменты фотосинтеза. Лекция 3. Фотосинтез II. Световая и темновая фаза фотосинтеза. С-3 – цикл. Лекция 4. Фотосинтез III. С-4 и САМ как экологическая адаптация растений. Лекция 5. Дыхание. Разнообразие окислительных путей у растений. Лекция 6. Минеральное питание I. Метаболизм азота. Лекция 7. Минеральное питание II. Поступление и транспорт ионов. Лекция 8. Рост и развитие I. Гормональная система. Ауксины. Лекция 9. Рост и развитие II. Цитокинины, гиббереллины, брассиностероиды. Лекция 10. Рост и развитие III. Стрессовые гормоны растений. Лекция 11. Фоторецепция и регулируемые светом процессы. Лекция 12. Фотопериодизм.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3617');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (29, 'Простые молекулы в нашей жизни
', 'online.edu.ru', '  Курс состоит из 12 лекций.   Часть I. Молекулы простых веществ    Лекция 1. Молекулярный водород   1. Что такое молекула? Вещества молекулярного строения. Молекула H2 2. Уникальные свойства водорода: распространенность в природе, физические свойства 3. История открытия 4. Получение и химические свойства водорода 5. Водород как источник энергии 6. Цепные реакции с водородом   Лекция 2. Кислород – молекула, которая изменила мир   1. Молекула кислорода 2. Свойства кислорода 3. История открытия кислорода. Получение и химические свойства кислорода 4. Кислород в организме. Дыхание 5. Фотосинтез и «кислородная катастрофа» 6. Кислород в промышленности   Лекция 3. Озон – молекула, которая защищает нас от Солнца   1. Молекула озона 2. Свойства и способы получения озона 3. Озон защищает нас от Солнца 4. Озон в воздухе и в воде   Лекция 4. Азот – самая инертная молекула   1. Молекула N2 2. Физические свойства азота. Жидкий азот 3. Способы получения и химические свойства азота 4. Проблема связывания азота. Круговорот азота в природе   Лекция 5. Хлор – цветной, ядовитый, полезный   1. Молекула Cl2 2. История открытия. Физические свойства 3. Способы получения и химические свойства хлора 4. Полезные и вредные применения хлора   Часть II. Молекулы сложных веществ    Лекция 6. Вода – молекула жизни   1. Молекула H2O 2. Вода в жидком, твердом и газообразном состоянии 3. Вода во Вселенной 4. Обычные и необычные свойства воды 5. Вода в нашей жизни 6. Мифы и заблуждения о воде   Лекция 7. Аммиак – азотсодержащий аналог воды   1. Молекула NH3 2. История открытия. Физические свойства 3. Жидкий аммиак как растворитель 4. Способы получения и химические свойства аммиака 5. Роль аммиака в жизни человека и общества   Лекция 8. Углекислый газ – продукт дыхания и горения   1. Молекула CO2 2. История открытия. Физические свойства 3. Способы получения, химические свойства и применение CO2 4. Углекислый газ в организме 5. Углекислый газ в атмосфере. Парниковый эффект   Лекция 9. Угарный газ – самая прочная молекула   1. Молекула CO 2. История открытия. Физические свойства и способы получения CO 3. Химические свойства CO 4. CO во Вселенной и вокруг нас   Лекция 10. Метан – самая легкая органическая молекула   1. Молекула CH4 2. История открытия. Физические свойства 3. Получение и химические свойства метана 4. Метан в природе 5. Метан в энергетике   Лекция 11. Этилен – молекула, которая соединяется сама с собой   1. Молекула C2H4 2. История открытия. Физические свойства 3. Получение и химические свойства этилена 4. Полимеры на основе этилена 5. Этилен в органическом синтезе   Лекция 12. Бензол – молекула с особыми химическими связями   1. Молекула бензола. Резонансные структуры 2. История открытия бензола 3. Ароматичность в органической химии 4. Физические и химические свойства бензола 5. Бензол в органическом синтезе  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3651');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (30, 'Зоология позвоночных
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3653');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (31, 'Динамическая вулканология
', 'online.edu.ru', '   Тема 1. Введение в вулканологию. Объекты, методы и история развития вулканологии. Глубинное строение Земли (кора, мантия, ядро, литосфера и астеносфера, континентальные и океанические плиты). Источники тепла, возможность мантийной конвекции. (Плечов П.Ю.)   Тема 2. Основные понятия и термины в вулканологии.Типы вулканов и морфология вулканических образований (кальдеры, маары, стратовулканы, моногенные и полигенные конуса, трещинные и щитовые вулканы). Геодинамические обстановки (океан: срединно-океанические хребты, океанические плато, океанические острова; континенты: рифтовые зоны, большие магматические провинции; переход океан-континент: островные дуги, задуговые бассейны, активные континентальные окраины). Распределение зон вулканизма по геодинамическим обстановкам. Основные механизмы магмогенерации. Типы извержений (исландский, гавайский, пиллоу-лавы, стромболианский, вулканианский, плинианский, суперплинианский, рост куполов, пелейский, фреатический). Эффузивная и эксплозивная деятельность, лавы и тефры, коэффициент эксплозивности. Сила извержений (объем, энергия, продолжительность, последствия, жертвы). (Плечов П.Ю.)   Тема 3. Продукты извержений. Лавовые купола, лавовые потоки, пирокластические потоки, отложения тефр, лахары, газообразные продукты извержения. Деление тефры по размерности (пеплы, лапилли, вулканические бомбы), агглютинаты и вулканические брекчии. Типы лав (аа-лавы, канатные лавы, пахое-хое, подушечные, глыбовые лавы). (Плечов П.Ю.)   Тема 4. Методы мониторинга и прогноза извержений. Климатические и биологические последствия, массовые вымирания в истории Земли. (Плечов П.Ю.)   Тема 5. Введение в гидромеханику и моделирование. Основные уравнения механики сплошной среды (уравнения неразрывности и сохранения импульса). Реология магмы. Подъем магмы в каналах и дайках. Течение Пуазейля. Простейшая модель извергающегося вулкана. (Мельник О.Э.)   Тема 6. Методы реконструкции физико-химических условий существования магм. Петрологическое моделирование. Использование элементов-примесей для выявления процессов, происходящих в магматических системах. (Плечов П.Ю.)   Тема 7. Летучие в магме. Нуклеация пузырьков и миграция газа.Закон Дарси. Фрагментация магмы. Ламинарные и турбулентные течения. Сила сопротивления канала вулкана.Модели эксплозивных извержений.(Мельник О.Э.)   Тема 8. Модели экструзивных извержений. Циклические режимы роста лавовых куполов. Кинетика кристаллизации магмы, вызванная дегазацией. Моделирование кристаллизации. Простейшая модель подъема магмы с кристаллизацией. Стационарное решение. Неустойчивость. Стационарные и циклические режимы извержения Экспериментальное моделирование циклических режимов. Короткопериодические циклы. (Мельник О.Э.)   Тема 9. Распространение продуктов вулканических извержений в атмосфере. Модель газопепловой струи в атмосфере. Конвективные и коллапсирующие струи. Пирокластические потоки. Моделирование реальных извержений. Вулканический пепел. Вулканогенные цунами, лахары. Суперизвержения. (Мельник О.Э.)  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3655');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (32, 'Продвинутые графы
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3659');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (33, 'Основы комбинаторики
', 'online.edu.ru', '   Правило сложения. Правило умножения. Принцип Дирихле.  Основные комбинаторные величины и их свойства. Размещения.  Сочетания с повторениями и без.  Комбинаторные тождества. Биномиальные коэффициенты. Тождества с биномиальными коэффициентами.  Полиномиальный коэффициент. Полиномиальная формула.  Формула включений и исключений. Применение формулы включений и исключений.  Выравнивания. Пример вычисления выравниваний.  Формула обращения Мёбиуса.  Циклические последовательности.  Разбиения чисел на слагаемые. Диаграмма Юнга.  Линейные рекуррентные соотношения. Формальные степенные ряды.  Производящие функции. Числа Фибоначчи и Каталана.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3663');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (34, 'Электричество и магнетизм
', 'online.edu.ru', '   Электрические заряды и электрическое поле. Закон сохранения заряда. Напряжённость электрического поля. Закон Кулона. Система единиц СГСЭ. Принцип суперпозиции. Электрическое поле диполя.  Теорема Гаусса для электрического поля в вакууме в интегральной и дифференциальной формах. Её применение для нахождения электростатических полей.  Потенциальный характер электростатического поля. Потенциал и разность потенциалов. Связь напряжённости поля с градиентом потенциала. Граничные условия на заряженной поверхности. Уравнения Пуассона и Лапласа. Единственность решения электростатической задачи. Метод «изображений».  Электрическое поле в веществе. Проводники в электрическом поле. Поляризация диэлектриков. Вектор поляризации. Свободные и связанные заряды. Теорема Гаусса при наличии диэлектриков. Вектор электрической индукции. Поляризуемость и диэлектрическая проницаемость. Граничные условия на поверхности проводника и на границе двух диэлектриков.  Электрическая ёмкость. Конденсаторы. Энергия электрического поля и её локализация в пространстве. Объёмная плотность энергии. Взаимная энергия зарядов. Энергия диполя в электрическом поле. Энергетический метод вычисления сил в электрическом поле.  Постоянный ток. Сила и плотность тока. Закон Ома в интегральной и дифференциальной формах. Электродвижущая сила. Правила Кирхгофа. Работа и мощность постоянного тока. Закон Джоуля–Ленца. Токи в объёмных средах.  Магнитное поле постоянного тока в вакууме. Вектор магнитной индукции. Сила Лоренца. Сила Ампера. Закон Био–Савара. Магнитное поле равномерно движущегося точечного заряда. Виток с током в магнитном поле. Магнитный момент тока.  Теорема о циркуляции магнитного поля в вакууме и её применение к расчету магнитных полей. Магнитное поле тороидальной катушки и соленоида. Дифференциальная форма теоремы о циркуляции.  Магнитное поле в веществе. Магнитная индукция и напряжённость поля. Вектор намагниченности. Токи проводимости и молекулярные токи. Теорема о циркуляции магнитного поля в веществе. Граничные условия на границе двух магнетиков. Применение теоремы о циркуляции для расчёта магнитных полей.  Магнитные свойства вещества. Качественные представления о механизме намагничивания пара- и диамагнетиков. Понятие о ферромагнетиках. Гистерезис. Магнитные свойства сверхпроводников I рода.  Электромагнитная индукция в движущихся и неподвижных проводниках. Закон электромагнитной индукции. Правило Ленца. Относительный характер электрического и магнитного полей. Преобразование →E и →B (при v &lt;&lt; c).  Коэффициенты само- и взаимоиндукции. Процесс установления тока в цепи, содержащей индуктивность. Теорема взаимности. Магнитная энергия и её локализация в пространстве. Объёмная плотность энергии. Энергетический метод вычисления сил в магнитном поле. Подъёмная сила электромагнита.  Движение заряженных частиц в электрических и магнитных полях. Определение удельного заряда электрона.  Квазистационарные процессы. Колебания в линейных системах. Колебательный контур. Свободные затухающие колебания. Коэффициент затухания, логарифмический декремент и добротность. Энергетический смысл добротности.  Комплексная форма представления колебаний. Векторные диаграммы. Комплексное сопротивление (импеданс). Правила Кирхгофа для переменных токов. Работа и мощность переменного тока.  Вынужденные колебания под действием синусоидальной силы. Амплитудная и фазовая характеристики. Резонанс. Процесс установления стационарных колебаний.  Вынужденные колебания под действием несинусоидальной силы. Амплитудная и фазовая модуляции. Понятие о спектральном разложении. Спектр одиночного прямоугольного импульса и периодической последовательности импульсов. Соотношение неопределённостей.  Спектральный анализ линейных систем. Колебательный контур как спектральный прибор. Частотная характеристика и импульсный отклик. Квадратичное детектирование модулированных сигналов.  Параметрическое возбуждение колебаний. Понятие об автоколебаниях. Обратная связь. Условие самовозбуждения. Роль нелинейности.  Электрические флуктуации. Тепловой шум, формула Найквиста. Дробовой шум, формула Шоттки (без вывода). Флуктуационный предел измерения слабых сигналов.  Уравнения Максвелла в интегральной и дифференциальной форме. Граничные условия. Ток смещения. Материальные уравнения. Волновое уравнение. Электромагнитные волны в однородном диэлектрике, их поперечность и скорость распространения.  Поток энергии в электромагнитной волне. Закон сохранения энергии и теорема Пойнтинга.  Электромагнитная природа света. Монохроматические волны. Комплексная амплитуда. Уравнение Гельмгольца. Плоские и сферические волны Давление излучения. Электромагнитный импульс. Излучение диполя (без вывода).  Понятие о линиях передачи энергии. Двухпроводная линия. Коэффициент стоячей волны (КСВ). Согласованная нагрузка.  Электромагнитные волны в прямоугольном волноводе. Дисперсионное уравнение. Критическая частота. Понятие об объёмных резонаторах.  Скин-эффект.  Электромагнитные волны на границе раздела двух диэлектриков. Формулы Френеля. Явление Брюстера. Явление полного внутреннего отражения.  Плазма. Экранировка, дебаевский радиус. Плазменная частота. Диэлектрическая проницаемость плазмы. Волны в плазме.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3665');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (35, 'Теория графов
', 'online.edu.ru', '   Понятие графа и виды графов.  Различные применения графов: от Кенигсберских мостов до Интернета.  Связность графа, подграфы и степень вершины.  Эквивалентные определения деревьев.  Планарность и критерий Куратовского  Формула Эйлера.  Хроматическое число планарного графа.  Перечисление деревьев: код Прюфера и формула Кэли.  Формула для числа унициклических графов.  Эйлеровы циклы и критерий эйлеровости.  Гамильтоновы циклы. Критерий Дирака и критерий Хватала.  Паросочетания. Теорема Холла и Кенига.  Экстремальная теория графов. Теорема Турана.  Аналог теоремы Турана для графов на плоскости.  Теория Рамсея. Знакомства среди шести человек.  Определение числа Рамсея.  Нижняя и верхняя оценки чисел Рамсея.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3669');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (36, 'Высшая математика. Линейная алгебра и элементы топологии
', 'online.edu.ru', '   Многочлены и линейная алгебра. Интерполяционный многочлен Лагранжа. Базисы и размерность пространства многочленов. Множественность решений системы линейных уравнений. Размерность линейного пространства.  Линейные операторы: определение и задание с помощью матрицы. Композиция линейных операторов. Экспонента от линейного оператора. Норма линейного оператора и сходимость ряда экспоненты.  Многомерный анализ и линейная алгебра. Примеры: задача о теплопроводности, задача о маятнике. Линеаризация систем дифференциальных уравнений.  Матрицы и системы линейных уравнений. Перемножение и обращение матриц. Невырожденность и определитель. Алгебраические дополнения и вычисление обратной матрицы. Матрица линейного оператора в новом базисе. Приложение: кубические интерполяционные сплайны.  Анатомия линейного оператора: диагонализация и жорданова нормальная форма. Экспонента от матрицы и линейные динамические системы.  Квадратичные формы и их матричная запись. Приведение квадратичной формы к каноническому виду. Ранг квадратичной формы. Закон инерции квадратичных форм. Критерий Сильвестра. Приведение к каноническому виду ортогональным преобразованием.  Метрические пространства. Принцип сжимающих отображений. Его приложение к теории дифференциальных уравнений (доказательство существования и единственности решения).  Компактность на прямой и в многомерном пространстве. Непрерывный образ компакта.  Векторные поля и их приложения: основная теорема алгебры и теорема Брауэра.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3671');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (37, 'Высшая математика. Математический анализ
', 'online.edu.ru', '   Мотивирующие примеры: как далеко видно с горы, приближенные вычисления, последовательность вложенных треугольников.  Примеры сходящихся и расходящихся рядов. Полнота множества вещественных чисел. Признаки сходимости рядов: интегральный, Даламбера и Коши.  Последовательности, интуитивное представление о сходимости. Сходимость без указания предела (фундаментальные последовательности). Предел последовательности, его связь с суммой ряда. Примеры пределов последовательностей. Рекуррентные последовательности.  Общее понятие предела, основанное на системе окрестностей. Использование пределов в математическом анализе: производная, задание и вычисление вещественных чисел, интеграл, асимптотика.  Многочлены и их графики. Корни многочлена и теорема Безу. Локальные экстремумы и производная. Старшие производные.  Экспонента: введение. Возникновение экспоненты и числа e в различных задачах.  Экспонента: алгебраический подход. Теорема о промежуточном значении и неизменность знака экспоненты. Построение экспоненты "по непрерывности".  Степенные ряды. Экспонента как степенной ряд. Число e − основание степени в экспоненте. "Замечательный предел" для числа e и экспоненты. Продолжение экспоненты на комплексную плоскость. Раскрытие скобок в произведении рядов. Абсолютная сходимость ряда и перестановка слагаемых. Условно сходящиеся ряды.  Функциональные последовательности и ряды. Равномерная сходимость функциональных последовательностей. Мажорируемая сходимость. Радиус сходимости степенного ряда.  Комплексная экспонента. Комплексные тригонометрические функции.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3673');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (38, 'Математическая логика
', 'online.edu.ru', '   Множества и их мощности. Счётные и несчётные множества. Диагональный метод Кантора.  Абстрактное понятие алгоритма. Машины Тьюринга. Счётность множества всех алгоритмов.  Вычислимые функции. Разрешимые и перечислимые множества. Существование невычислимых функций и неразрешимых множеств из соображений мощности.  Неразрешимость проблем самоприменимости и остановки. Теорема Успенского-Райса.  Понятие m-сводимости. Построение неперечислимого множества, дополнение к которому также неперечислимо.  Алгоритмически неразрешимые задачи в комбинаторике и алгебре.  Теорема Клини о неподвижной точке. Существование в любом языке программирования программы, печатающей собственный текст.  Понятие формальной системы доказательств. Аксиомы формальной арифметики.  Теорема Гёделя о неполноте. Существование принципиально непознаваемой программы.  Лямбда-исчисление: синтаксис, приведение к нормальной форме, нумералы Чёрча, реализация простейших функций.  Лямбда-исчисление: комбинатор неподвижной точки и рекурсивное программирование.  Основы теории сложности вычислений: измерение времени работы программы. Классы P и NP. Проблема перебора (равны ли классы P и NP). NP-полные задачи.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3677');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (39, 'Оптика
', 'online.edu.ru', '  Неделя 1 Принцип Ферма и законы геометрической оптики. Полное внутреннее отражение. Оптические инструменты: телескоп, микроскоп. Элементы фотометрии. Яркость и освещённость изображения.  Неделя 2 Волновое уравнение, монохроматические волны, комплексная амплитуда, уравнение Гельмгольца, плоские и сферические волны. Принцип суперпозиции и интерференция монохроматических волн. Видность полос, ширина полосы.  Неделя 3 Статистическая природа излучения квазимонохроматической волны. Временная когерентность, функция временной когерентности, связь со спектральной интенсивностью (теорема Винера–Хинчина). Ограничение на допустимую разность хода в двухлучевых интерференционных схемах, соотношение неопределенностей.  Неделя 4 Интерференция при использовании протяженных источников. Пространственная когерентность, функция пространственной когерентности, связь с распределением интенсивности излучения по источнику I(x) (теорема Ван Циттерта–Цернике). Ограничения на допустимые размеры источника и апертуру интерференции в двухлучевых схемах.  Неделя 5 Дифракция волн. Принцип Гюйгенса–Френеля. Дифракция на тонком экране. Граничные условия Кирхгофа. Волновой параметр. Дифракция Френеля. Задачи с осевой симметрией, зоны Френеля, спираль Френеля. Зонные пластинки, линза. Дифракция на дополнительном экране, пятно Пуассона.  Неделя 6 Дифракция волн. Принцип Гюйгенса–Френеля. Дифракция на тонком экране. Граничные условия Кирхгофа. Волновой параметр. Дифракция Френеля. Задачи с осевой симметрией, зоны Френеля, спираль Френеля. Зонные пластинки, линза. Дифракция на дополнительном экране, пятно Пуассона.  Неделя 7 Дифракция Фраунгофера. Световое поле в зоне Фраунгофера как преобразование Фурье граничного поля. Дифракция Фраунгофера на щели, дифракционная расходимость. Дифракционный предел разрешения телескопа и микроскопа. Поле в фокальной плоскости линзы.  Неделя 8 Спектральные приборы: призма, дифракционная решётка, интерферометр Фабри–Перо. Характеристики спектральных приборов: разрешающая способность, область дисперсии, угловая дисперсия.  Неделя 9 Проверочная  Неделя 10 Теория Аббе формирования оптического изображения, принцип двойной дифракции. Полоса пропускания оптической системы, связь с разрешающей способностью. Разрешающая способность при когерентном и некогерентном освещении. Принципы фурье-оптики. Метод Рэлея решения задачи дифракции: волновое поле как суперпозиция плоских волн разных направлений (пространственное фурье-разложение), соотношение неопределённостей. Дифракция Френеля на периодических структурах (эффект саморепродукции). Область геометрической оптики.  Неделя 11 Принципы голографии. Голограмма Габора. Голограмма с наклонным опорным пучком. Разрешающая способность голограммы. Объёмная голограмма, объёмная решётка в регистрирующей среде, условие Брэгга–Вульфа.  Неделя 12 Дисперсия света, фазовая и групповая скорости, формула Рэлея. Классическая теория дисперсии. Комплексный показатель преломления и поглощения света в среде. Затухающие волны, закон Бугера. Нормальная и аномальная дисперсии.  Неделя 13 Поляризация света. Естественный свет. Явление Брюстера. Дихроизм, поляроиды, закон Малюса. Двойное лучепреломление в одноосных кристаллах. Интерференционные явления в кристаллических пластинках. Понятие об искусственной анизотропии. Эффект Фарадея и эффект Керра.  Неделя 14 Рэлеевское рассеяние (рассеяние на флуктуациях плотности). Эффективное сечение рассеяния. Поляризация рассеянного света. Нелинейная поляризация среды. Генерация второй гармоники (удвоение частоты), фазовый синхронизм. Самофокусировка.  Неделя 15 Проверочная  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3679');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (40, 'Философские концепции науки и техники
', 'online.edu.ru', '   ВВЕДЕНИЕ.  - Философия как способ индивидуально обосновываемого обсуждения предельных вопросов. Основные темы: бытие, сознание, природа, общество, искусство и техника. Культуроцентричный подход к бытию: человечество, культура и история; исторические этапы развития человечества; понятие цивилизаций; исторические этапы развития Западной Европы и России. - Средневековая философия Проблема веры и разума в раннехристианской патристике (Тертулиан и платонический синтез Бл.Августина). Аристотелеизм и схоластика. Проблема веры и разума в средневековой схоластике (аверроизм и аристотелевский синтез Фомы Аквинского). Линии Аристотеля и Платона в средние века: а) спор номиналистов и реалистов б)схоластика и мистицизм. Ник.Кузанский и понятие бесконечности. - Гуманизм, Возрождение, Реформация. Их взаимоотношение. Основные идеи и направления.   I. ЧЕЛОВЕК И ОБЩЕСТВО.  Этические и этико-политические проблемы - Вопрос о смысле жизни как предельный вопрос этики. - Процесс этической индивидуализации в древнем мире. Осознание противоречия между гедонистическим смыслом жизни, конечностью жизни и справедливостью-добродетелью. Типы разрешения этого противоречия: а) загробное воздаяние б) решение Платона и Будды в) решение римского стоицизма и конфуцианства ( http://philosophy.mipt.ru/publications/works/lipkin/civilization/crisis_renascence ); решения эпохи Просвещения: разумный эгоизм; утилитаризм; этика долга Канта (добрая воля, долг, счастье, категорический императив (""Критика практического разума""). Этические концепции Востока - Новый тип этических проблем (Макиавелли (""Государь""), Достоевский (""Великий инквизитор"") , Сартр (""Дьявол и Господь Бог"")) - Этико-политические системы просвещения и современности - ""Естественное состояние"" и ""общественный договор"" (Гоббс , Локк , Руссо [Б.Рассел: http://www.philosophy.ru/library/russell/01/00.html  ]). Либерализм и социализм: сравнение западных индивидуалистически-демократических политико-экономических систем и коллективистски-авторитарных систем ""реального социализма"" (Поппер и Хайек [см. Поппер К. ""Открытое общество и его враги"" и Хайек Ф.А. ""Пагубная самонадеятельность: ошибки социализма""]), неолиберализм - теория рационального выбора Дж. Ролса, социал-демократизм, неоклассицизм ( http://50.economicus.ru/index.php?ch=5&amp;le=43&amp;r=4&amp;z=0 ); утопизм (утопия – вымышленное рационально устроенное общество всеобщего благоденствия ( http://www.mnemosyne.ru/library/rawls.html ), идет от ""Утопии"" Томаса Мора ( http://lib.ru/INOOLD/MOR/utopia.txt )), анархизм и новые левые (см. ст.М.А.Хевеши ""АНТИКАПИТАЛИСТИЧЕСКИЙ БУНТ ""НОВЫХ ЛЕВЫХ"")( http://philosophy.ru/iphras/library/absol.html#195 ), национализм ХХ века, мультикультурализм и религиозный фундаментализм ( http://philosophy.mipt.ru/publications/works/lipkin/civilization/LipkinPubl1206.html ); глобализм и антиглобализм.  Вопросы для семинара по теме I.  - Три формы отношений индивида и общества (коллективизм, эгоцентризм, личность) на материале античности? - Отличие мировой и «государственной» религий? - Этико-политические концепции Гоббса, Локка, Руссо (по Расселу)? - Утилитаризм? - Этика долга Канта? - Либерализм и неолиберализм, ""теория справедливости"", понятия отрицательной и положительной свободы? - Социализм: ""за"" (западный марксизм 20 в. и новые левые) и ""против"" (Поппер, Хайек)? - Мультикультурализм? Литература: Современный либерализм: Ролз,... М., 1998 ( http://www.mnemosyne.ru/library/index.html )   II. ПРИРОДА И ЕЕ ПОЗНАНИЕ  - Фр.Бэкон – отец английского эмпиризма. Рождение науки Нового времени (Коперник и Галилей). Специфика эксперимента. Отличие естественной науки от натурфилософии ( http://philosophy.mipt.ru/publications/works/lipkin/philsci/LipkinPubl02.html  или ""Философия науки"" (ред. А.И.Липкин), гл. 7) - Декарт и основные элементы системы новоевропейского рационализма. Проблема субстанции у Спинозы и Лейбница [Б.Рассел:  http://www.philosophy.ru/library/russell/01/00.html  ] - Эмпиризм Дж.Локка. Его противостояние Декарту - Материалистическая и идеалистическая линии эмпиризма. Французское Просвещение и механицистски-материалистическое решение проблемы соотношения теории и реальности у Дидро и Ламетри. Механицистский детерминизм Лапласа. Идеалистическое решение тех же проблем у Беркли и Юма. - И.Кант и его вариант решения споров между рационализмом и эмпиризмом и между материализмом и идеализмом на основе понятий: ""вещь в себе"" и ""явление""; ""априорные"" формы, ""синтетическое"" и ""аналитическое"" суждения. - Эстетика Канта - Попытки преодоления кантовской ""вещи в себе"" в немецкой классической философии и немецкая натурфилософия (Гете, Фихте, Шеллинг) - Философская система Гегеля: логика и диалектический метод, философия природы, философия духа - Неокантианство - Неогегельянство. Антропология Фейербаха. Марксизм - 1-й позитивизм Конта, Милля и Спенсера. Отрицание метафизики и эволюционизм. Гносеологический кризис в физике и 2-й позитивизм . От эволюционизма к психологизму: махизм и конвенционализм Пуанкаре. Американский прагматизм (Пирс, Джеймс, Дьюи)  - Aналитическая философия Витгенштейна и Рассела и неопозитивизм ""Венского кружка"". От психологизма к логицизму. Проблема соотношения теоретического и эмпирического ""уровней знания"". Критерий верифицируемости, ""язык наблюдения"" и его эволюция. Аналитическая философия - Логическая критика позитивизма К.Поппером и проблемы ""теоретической нагруженности"" эмпирических утверждений и неотделимости эксперимента от интерпретации. Проблема ""демаркации"" Поппера между естественной наукой, натурфилософией, гуманитарной наукой и ""ненауками"". Проблема истины и ""третий мир"". Эволюционная эпистемология - Историцистская критика позитивизма: модели развития науки Куна, Лакатоса и эволюционной эпистемологии. ""Философия и зеркало природы"" Р.Рорти   III. ОСНОВАНИЯ БЫТИЯ  - Антропология экзистенциализма (от сущности к существованию). Проблема ""свободы воли"" у С.Кьеркегора. Потерянное поколение и немецкий экзистенциализм (Ясперс, Хайдеггер), Массовая культура ХХ в. (Ортега-и-Гассет). - II Мировая война, французское ""Сопротивление"" и коллаборационизм, проблемы свободы воли, теодицеи и атеизма во французском экзистенциализме (Камю, Сартр). Персонализм. - Философская Антропология XIX-XX вв. (Э.Кассирер, И.Хейзинга, Г.Маркузе, Х.Ортега-и-Гассет, Шелер и др.) - Философия жизни. От бытия к воле и жизни: (Шопенгауэр, Ницше, Бергсон) - Неомарксизм в XX вв. Франкфуртская школа (М.Хоркхмайер, Т.Адорно, Г.Маркузе, Ю.Хабермас)   IV. ГУМАНИТАРНОЕ ПОЗНАНИЕ  - Феноменология Э.Гуссерля - Герменевтика как метод познания культурно-исторических явлений у В.Дильтея. Критика герменевтического психологизма М. Шелером. Герменевтические идеи М. Хайдеггера. Учение о языке как ""доме бытия"". Философская герменевтика Х.Г.Гадамера   V. ВНУТРЕННИЙ МИР ЧЕЛОВЕКА.  - Философия сознания. - Психо-физическая проблема в ХХ в. и кризис разума Нового времени. Иррационализм и мистика в ХХ в. Связь внутреннего и внешнего мира: механическое и магическое, рациональное и иррациональное. Сознание и бессознательное. Психоаналитическая антропология З.Фрейда. Коллективное бессознательное К.Юнга и др. Сознание, бессознательное и язык (Ж.. Лакан), деприватизация бессознательного (Ж.Делез и Ф.Гваттари). - Еропейская традиция Cogito. - Отказ от проблематики сознания; Дьюи, Хайдеггер, Витгенштейн  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3681');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (41, 'Введение в теорию вероятностей
', 'online.edu.ru', '   Классическое определение вероятности.  Условные вероятности, формула полной вероятности и формула Байеса.  Независимость событий.  Схема Бернулли.  Вероятностный метод: задача о раскраске.  Математическое ожидание и дисперсия случайной величины.  Неравенство Маркова и неравенство Чебышева.  Применение неравенств Маркова и Чебышева.  Независимость случайных величин.  Закон больших чисел.  Предельные теоремы Пуассона и Муавра-Лапласа.  Геометрическое определение вероятности. Задача о встрече.  Колмогоровское определение вероятностного пространства.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3683');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (42, 'Случайные процессы
', 'online.edu.ru', '   Ветвящиеся случайные процессы.  Пуассоновский процесс.  Гауссовские процессы.  Винеровский процесс (процесс броуновского движения).  Марковские моменты  Условное математическое ожидание.  Мартингалы.  Марковские цепи с дискретным временем.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3687');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (43, 'Термодинамика и молекулярная физика
', 'online.edu.ru', '  Неделя 1 Основные понятия молекулярной физики и термодинамики: предмет исследования, его характерные особенности. Задачи молекулярной физики. Уравнения состояния. Давление идеального газа как функция кинетической энергии молекул. Соотношение между температурой идеального газа и кинетической энергией его молекул. Законы идеальных газов. Уравнения состояния идеального газа. Квазистатические, обратимые и необратимые термодинамические процессы. Нулевое начало термодинамики. Работа, теплота, внутренняя энергия. Первое начало термодинамики. Теплоёмкость. Теплоёмкость идеальных газов при постоянном объёме и постоянном давлении, уравнение Майера. Адиабатический и политропический процессы. Уравнение политропы для идеального газа. Адиабатический и политропический процессы. Независимость внутренней энергии идеального газа от объёма.  Неделя 2 Второе начало термодинамики. Формулировки второго начала. Тепловая машина. Определение КПД тепловой машины. Цикл Карно. Теорема Карно. Неравенство Клаузиуса. Максимальность КПД цикла Карно по сравнению с другими термодинамическими циклами. Холодильная машина. Эффективность холодильной машины. Тепловой насос. Эффективность теплового насоса, работающего по циклу Карно. Связь между коэффициентами эффективности теплового насоса и холодильной машины.  Неделя 3 Термодинамическое определение энтропии. Закон возрастания энтропии. Энтропия идеального газа. Энтропия в обратимых и необратимых процессах. Адиабатическое расширение идеального газа в вакуум. Объединённое уравнение первого и второго начал термодинамики. Третье начало термодинамики. Изменение энтропии и теплоёмкости при приближении температуры к абсолютному нулю.  Неделя 4 Термодинамические функции. Свойства термодинамических функций. Максимальная и минимальная работа. Преобразования термодинамических функций. Соотношения Максвелла. Зависимость внутренней энергии от объёма. Зависимость теплоёмкости от объёма. Соотношение между СP и СV. Теплофизические свойства твёрдых тел. Термодинамика деформации твёрдых тел. Изменение температуры при адиабатическом растяжении упругого стержня. Тепловое расширение как следствие ангармоничности колебаний в решётке. Коэффициент линейного расширения стержня.  Неделя 5 Условия термодинамического равновесия. Фазовые превращения. Фазовые переходы I и II рода. Химический потенциал. Условие равновесия фаз. Кривая фазового равновесия. Уравнение Клапейрона–Клаузиуса. Диаграмма состояния двухфазной системы «жидкость–пар». Зависимость теплоты фазового перехода от температуры. Критическая точка. Тройная точка. Диаграмма состояния «лёд–вода–пар». Поверхностные явления. Термодинамика поверхности. Свободная энергия поверхности. Краевые углы. Смачивание и несмачивание. Формула Лапласа. Зависимость давления пара от кривизны поверхности жидкости. Кипение. Роль зародышей при образовании новой фазы.  Неделя 6 Газ Ван-дер-Ваальса как модель реального газа. Изотермы газа Ван-дер-Ваальса. Метастабильные состояния. Перегретая жидкость и переохлаждённый пар. Правило Максвелла и правило рычага. Критические параметры и приведённое уравнение состояния газа Ван-дер-Ваальса. Внутренняя энергия газа Ван-дер-Ваальса. Уравнение адиабаты газа Ван-дер-Ваальса. Энтропия газа Ван-дер-Ваальса. Скорость звука в газах. Скорость истечения газа из отверстия. Эффект Джоуля–Томсона. Адиабатическое расширение, дросселирование. Получение низких температур.  Неделя 7 Проверочная  Неделя 8 Динамические и статистические закономерности. Макроскопические и микроскопические состояния. Фазовое пространство. Элементы теории вероятностей. Условие нормировки. Средние величины и дисперсия. Биномиальный закон распределения. Распределение Пуассона. Распределение Гаусса.  Неделя 9 Распределения Максвелла. Распределение частиц по компонентам скорости и абсолютным значениям скорости. Наиболее вероятная, средняя и среднеквадратичная скорости. Распределения Максвелла по энергиям. Среднее число ударов молекул, сталкивающихся в единицу времени с единичной площадкой. Средняя энергия молекул, вылетающих в вакуум через малое отверстие в сосуде.  Неделя 10 Распределение Больцмана в однородном поле сил. Барометрическая формула. Микро- и макросостояния. Статистический вес макросостояния. Статистическое определение энтропии. Энтропия при смешении газов. Парадокс Гиббса. Представление о распределении Гиббса. Статистическая сумма и её использование для нахождения внутренней энергии. Статистическая температура.  Неделя 11 Флуктуации. Средние значения энергии и дисперсии (среднеквадратичной флуктуации) энергии частицы. Флуктуации термодинамических величин. Флуктуация температуры в фиксированном объёме. Флуктуация объёма в изотермическом и адиабатическом процессах. Флуктуации аддитивных физических величин. Зависимость флуктуаций от числа частиц, составляющих систему.  Неделя 12 Теплоёмкость. Классическая теория теплоёмкостей. Закон равномерного распределения энергии теплового движения по степеням свободы. Теплоёмкость кристаллов (закон Дюлонга–Пти). Элементы квантовой теории теплоёмкостей. Характеристические температуры. Зависимость теплоёмкости от температуры.  Неделя 13 Столкновения. Эффективное газокинетическое сечение. Длина свободного пробега. Распределение молекул по длинам свободного пробега. Число столкновений молекул между собой. Явления переноса: вязкость, теплопроводность и диффузия. Законы Фика и Фурье. Коэффициенты вязкости, теплопроводности и диффузии в газах.  Неделя 14 Броуновское движение. Подвижность. Закон Эйнштейна–Смолуховского. Связь подвижности частицы и коэффициента диффузии. Явления переноса в разрежённых газах. Эффект Кнудсена. Эффузия. Течение разрежённого газа через прямолинейную трубу.  Неделя 15 Проверочная  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3691');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (44, 'Теоретическая механика для инженеров и исследователей
', 'online.edu.ru', '  1. Кинематика точки 1.1. Задачи кинематики. Декартова система координат. Разложение вектора по ортонормированному базису. Радиус-вектор и координаты точки. Скорость и ускорение точки. Траектория движения. 1.2. Естественный трёхгранник. Разложение скорости и ускорения в осях естественного трехгранника (теорема Гюйгенса). 1.3. Криволинейные координаты точки, примеры: полярная, цилиндрическая и сферическая системы координат. Составляющие скорости и проекции ускорения на оси криволинейной системы координат.  2. Способы задания ориентации твердого тела 2.1. Твердое тело. Неподвижная и связанная с телом системы координат. 2.2. Ортогональные матрицы поворота и их свойства. Теорема Эйлера о конечном повороте. 2.3. Активная и пассивная точки зрения на ортогональное преобразование. Сложение поворотов. 2.4. Углы конечного вращения: углы Эйлера и "самолетные" углы. Выражение ортогональной матрицы через углы конечного вращения.  3. Пространственное движение твердого тела 3.1. Поступательное и вращательное движения твердого тела. Угловая скорость и угловое ускорение. 3.2. Распределение скоростей (формула Эйлера) и ускорений (формула Ривальса) точек твердого тела. 3.3. Кинематические инварианты. Кинематический винт. Мгновенная винтовая ось.  4. Плоскопараллельное движение 4.1. Понятие плоскопараллельного движения тела. Угловая скорость и угловое ускорение в случае плоскопараллельного движения. Мгновенный центр скоростей.  5. Сложное движение точки и твердого тела 5.1. Неподвижная и движущаяся системы координат. Абсолютное, относительное и переносное движения точки. 5.2. Теорема о сложении скоростей при сложном движении точки, относительная и переносная скорости точки. Теорема Кориолиса о сложении ускорений при сложном движении точки, относительное, переносное и кориолисово ускорения точки. 5.3. Абсолютные, относительные и переносные угловая скорость и угловое ускорение тела.  6. Движение твердого тела с неподвижной точкой (кватернионное изложение) 6.1. Понятие о комплексных и гиперкомплексных числах. Алгебра кватернионов. Кватернионное произведение. Сопряженный и обратный кватернион, норма и модуль. 6.2. Тригонометрическое представление единичного кватерниона. Кватернионный способ задания поворота тела. Теорема Эйлера о конечном повороте. 6.3. Связь между компонентами кватерниона в разных базисах. Сложение поворотов. Параметры Родрига-Гамильтона.  7. Экзаменационная работа  8. Основные понятия динамики. 8.1 Импульс, момент импульса (кинетический момент), кинетическая энергия. 8.2 Мощность сил, работа сил, потенциальная и полная энергия. 8.3 Центр масс (центр инерции) системы. Момент инерции системы относительно оси. 8.4 Моменты инерции относительно параллельных осей; теорема Гюйгенса–Штейнера. 8.5 Тензор и эллипсоид инерции. Главные оси инерции. Свойства осевых моментов инерции. 8.6 Вычисление момента импульса и кинетической энергии тела с помощью тензора инерции.  9. Основные теоремы динамики в инерциальных и неинерциальных системах отсчёта. 9.1 Теорема об изменении импульса системы в инерциальной системе отсчета. Теорема о движении центра масс. 9.2 Теорема об изменении момента импульса системы в инерциальной системе отсчета. 9.3 Теорема об изменении кинетической энергии системы в инерциальной системе отсчета. 9.4 Потенциальные, гироскопические и диссипативные силы. 9.5 Основные теоремы динамики в неинерциальных системах отсчета .  10. Движение твёрдого тела с неподвижной точкой по инерции. 10.1 Динамические уравнения Эйлера. 10.2 Случай Эйлера, первые интегралы динамических уравнений; перманентные вращения. 10.3 Интерпретации Пуансо и Маккулага. 10.4 Регулярная прецессия в случае динамической симметрии тела.  11. Движение тяжёлого твёрдого тела с неподвижной точкой. 11.1 Общая постановка задачи о движении тяжелого твердого тела вокруг. неподвижной точки. Динамические уравнения Эйлера и их первые интегралы. 11.2 Качественный анализ движения твердого тела в случае Лагранжа. 11.3 Вынужденная регулярная прецессия динамически симметричного твердого тела. 11.4 Основная формула гироскопии. 11.5 Понятие об элементарной теории гироскопов.  12. Динамика точки в центральном поле. 12.1 Уравнение Бине. 12.2 Уравнение орбиты. Законы Кеплера. 12.3 Задача рассеяния. 12.4 Задача двух тел. Уравнения движения. Интеграл площадей, интеграл энергии, интеграл Лапласа.  13. Динамика систем переменного состава. 13.1 Основные понятия и теоремы об изменении основных динамических величин в системах переменного состава. 13.2 Движение материальной точки переменной массы. 13.3 Уравнения движения тела переменного состава.  14. Теория импульсивных движений. 14.1 Основные понятия и аксиомы теории импульсивных движений. 14.2 Теоремы об изменении основных динамических величин при импульсивном движении. 14.3 Импульсивное движение твёрдого тела. 14.4 Соударение двух твёрдых тел. 14.5 Теоремы Карно.  15. Контрольная работа  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3693');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (45, 'Веб-графы и методы работы с ними
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3695');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (136, 'Линейные системы автоматического управления
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Введение в проблематику, типы задач и классификация систем управления  Математические модели систем управления, их формы и принципы составления  Структурные схемы и структурные преобразования  Структурные свойства и временные характеристики систем  Частотные характеристики систем  Типовые звенья и их характеристики  Устойчивость систем. Алгебраические и частотные критерии устойчивости  Критерии качества систем управления. Точностные характеристики  Общие принципы управления. Типовые регуляторы систем  Принципы модального управления   Каждая тема предполагает изучение в течение одной недели. На 10-й неделе запланирован итоговый интернет-экзамен.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3979');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (46, 'Физическая химия. Кинетика
', 'online.edu.ru', '  Раздел 1 Формальная химическая кинетика.    Кинетика; химическая кинетика, скорость реакции    Кинетическое уравнение и порядок реакции    Порядок реакции; время полупревращения    Методы определения порядка реакции    Раздел 2 Кинетика вблизи равновесия. Зависимость скорости реакции от температуры    Кинетика и равновесие    Зависимость скорости реакции от температуры    Теория переходного состояния (теория абсолютных    скоростей реакций)    Раздел 3 Кинетика сложных реакций    Кинетика параллельных и последовательных реакций    Автокаталитические реакции в открытых системах    Цепные реакции    Раздел 4 Диффузия.    Диффузия – общее описание    2-ое уравнение диффузии, основные решения    Основные результаты экспериментальных исследований диффузии в твердых телах    Раздел 5 Механизмы диффузии в твердых телах    Модель случайных блужданий    Механизмы диффузии в кристаллах    Диффузия в многофазных системах    Раздел 6 Кинетика гетерогенных процессов   Общие понятия гетерогенной кинетики  Процессы последовательного и параллельного массопереноса  Процессы последовательного и параллельного массопереноса и химической реакции   Раздел 7 Поверхностные явления   Поверхности раздела фаз, их характеристики  Теория Лангмюра  Эффективная поверхность. Полимолекулярная адсорбция  Адсорбция в растворах   Раздел 8Кинетика фазовых превращений   Фазовые переходы 1-го рода  Критический размер зародышей  Скорость зарождения центров и линейная скорость роста  Гетерогенное образование зародышей. Уравнение Аврами.   Раздел 9Фазовые превращения второго рода. Теория электролитов.   Фазовые превращения 2-го рода  Теория электролитов. Положения теории Аррениуса  Теория электролитов. Определение степени диссоциации  Теория электролитов.Степень диссоциации.Числа переноса   Раздел 10Электродные процессы. Общее заключение   Электрохимия окислительно- восстановительных процессов  Термодинамика электродных процессов  Типы электродов   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3697');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (47, 'Физическая химия. Термодинамика
', 'online.edu.ru', '  1. Введение. Первый закон термодинамики. Основные понятия и определения. Математическая формулировка первого закона термодинамики. Внутренняя энергия и энтальпия. Применение первого закона термодинамики к простейшим процессам. Зависимости внутренней энергии и энтальпии от параметров состояния.  2. Применение первого закона термодинамики к химическим процессам. Второй закон термодинамики. Термохимия. Закон Гесса. Зависимость теплоты химической реакции от температуры. Обратимые процессы. Математическая формулировка второго закона термодинамики.  3. Энтропия. Определение направления процессов в изолированной системе. Вычисление энтропии при различных процессах. Статистическая интерпретация понятия энтропии.  4. Функции состояния энергия Гиббса и энергия Гельмгольца. Критерии определения направления процессов в неизолированных системах. Зависимость энергии Гиббса и энергии Гельмгольца от параметров состояния.  5. Расчеты химических равновесий. Изотерма Вант­Гоффа. Константа равновесия химической реакции. Расчет выхода химической реакции. Зависимость константы равновесия химической реакции от температуры. Изохора Вант­Гоффа.  6. Третий закон термодинамики. Тепловая теорема Нернста. Вычисление абсолютных значений энтропии. Применение третьего закона термодинамики для расчетов равновесий.  7. Теория растворов. Парциальные мольные величины. Бесконечно разбавленные растворы. Законы Генри и Рауля. Выбор стандартного состояния. Равновесия химических реакций в бесконечно разбавленных растворах. Идеальные растворы.  8. Реальные растворы. Активность. Применения активности для расчетов равновесий в растворах. Методы определения активности.  9. Фазовые равновесия. Правило фаз. Диаграммы фазовых равновесий двухкомпонентных систем. Экспериментальные методы построения диаграмм состояния. Принципы термодинамического расчета диаграмм состояния.  10. Применение термодинамики к электрохимическим процессам. Термодинамика гальванического элемента. Активность компонентов в растворах электролитов, методы ее определения. Электродные потенциалы. Определение термодинамических величин электрохимическими методами.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3699');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (48, 'Детали машин и основы конструирования
', 'online.edu.ru', '  1. Основные понятия и определения. Критерии работоспособности деталей машин; 2. Машиностроительные материалы. Их классификация и область применения; 3. Допуски размеров. Посадки деталей. Отклонения формы и расположения поверхностей. Шероховатость поверхности; 4. Неразъемные соединения деталей: сварные, заклепочные, паяные, клеевые; 5. Разъемные соединения деталей: резьбовые, шпоночные, шлицевые, штифтовые, клеммовые; 6. Зубчатые передачи. Основная теорема зацепления. Геометрия зубьев. Методика расчета передач; 7. Многозвенные зубчатые передачи: планетарные, дифференциальные, волновые. Кинематика передач; 8. Червячные передачи. Геометрия и конструкция. КПД передачи и ее тепловой расчет; 9. Фрикционные передачи и вариаторы. Ременные передачи; 10. Валы и оси. Критерии работоспособности. Расчет на прочность. Уплотнения валов; 11. Подшипники. Классификация и конструкция. Расчет подшипников; 12. Муфты: неуправляемые, компенсирующие, предохранительные; 13. Методика конструирования. Пример конструирования редуктора.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3701');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (49, 'Инженерная геология
', 'online.edu.ru', '  1. Цели и задачи науки «Инженерная геология». 2. Принципы инженерно-геологического изучения и классификации горных пород. 3. Основы инженерной петрографии. 4. Инженерной геологии массива горных пород. 5. Инженерно-геологические изыскания. 6. Методы получения инженерно-геологической информации. 7. Неоген-четвертичных отложений. 8. Горно-геологических явлений, возникающих при ведении горных и строительных работ и методы борьбы с ними. 9. Методы оценки и минимизации рисков, связанных с инженерно-геологическими явлениями при освоении территорий. 10. Прогноз изменения гидрогеологических и инженерно-геологических условий при освоении территорий.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3703');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (50, 'Твердые горючие ископаемые. Систематика, происхождение, свойства
', 'online.edu.ru', '  Разделы курса:   Общая систематика различных твердых горючих ископаемых и их отличительные признаки (торф, бурые угли, каменные угли, антрациты, сапропели, богхеды, горючие сланцы).  Исходный растительный материал, условия накопления и преобразования в горючие ископаемые. Стадии процесса углеобразования. Виды твердых горючих ископаемых.  Характеристика углей по данным их технического анализа.  Характеристика углей по данным элементарного анализа.  Молекулярная структура органических твердых горючих ископаемых. Физические и физико-химические методы исследования (рентгеноструктурный анализ, инфракрасная спектроскопия, электронный парамагнитный резонанс, ядерный магнитный резонанс). Изучение физико-механических, теплофизических и электрофизических свойств.  Классификация углей. Единая и промышленная классификация углей в России и за рубежом. Международная кодификация каменных и бурых углей.  Выветривание, окисление и самовозгорание углей.  Основные технологические процессы переработки углей  Характеристика основных и попутных компонентов угольных месторождений. Использование метана.  Современные технологии «чистой» переработки углей.     На прохождение каждого раздела отводится 1 неделя. По завершении недели обучения слушатели должны выполнить 1 обязательное экзаменационное задание.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3705');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (157, 'Введение в биологию и экологию
', 'online.edu.ru', '   РАЗДЕЛ 1. Введение   Тема 1.1. Биология как наука   РАЗДЕЛ 2. Клеточная организация жизни   Тема 2.1. Клетка – элементарная биологическая система  Тема 2.2. Основные неорганические и органические вещества клетки  Тема 2.3. Строение клетки  Тема 2.4. Общая характеристика метаболизма   РАЗДЕЛ 3. Размножение и развитие    Тема 3.1. Деление ядра и клетки  Тема 3.2. Размножение и воспроизводство живых организмов  Тема 3.3. Клеточные основы роста и развития   РАЗДЕЛ 4. Генетика – наука о наследовании признаков   Тема 4.1. Классическая генетика  Тема 4.2. Хромосомная теория наследственности  Тема 4.3. Генетика человека  Тема 4.4. Изменчивость как свойство жизни  Тема 4.5. Селекция – прикладной аспект генетики   РАЗДЕЛ 5. Эволюция жизни на Земле   Тема 5.1. Свидетельства эволюции. Микроэволюция  Тема 5.2. Макроэволюция  Тема 5.3. Происхождение и эволюция человека   РАЗДЕЛ 6. Царства живых организмов. Таксономическое и систематическое биоразнообразие   Тема 6.1. Надцарство Прокариоты. Архебактерии. Эубактерии  Тема 6.2. Надцарство Эукариоты. Царство Протиста  Тема 6.3. Царство Грибы  Тема 6.4. Царство Растения  Тема 6.5. Царство Животные  Тема 6.6. Вирусы   РАЗДЕЛ 7. Экология как наука   Тема 7.1. Экология как наука. Организм и среда  Тема 7.2. Популяционная экология  Тема 7.3. Экология сообществ  Тема 7.4. Биосфера – глобальная экосистема Земли  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4031');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (51, 'Линейная алгебра и геометрия. Часть 2: векторная алгебра
', 'online.edu.ru', ' Данный курс состоит из теоретической и практической частей, построенных вокруг системы кейсов, взятых из реальной практики геометрического моделирования движения мобильных виртуальных объектов и применения машинного обучения. Дается необходимая теория, при этом используются только конструктивные доказательства теорем, иллюстрируется применение теории для решения кейсов.
Авторы более 5 лет используют данный односеместровый курс в Волгатехе для студентов 1-го курса специальности "Программная инженерия". Курс будет полезен всем студентам, ориентирующимся на применение современных технологий компьютерной обработки данных. Вторая часть курса посвящена изучению основ векторной алгебры. ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3731');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (52, 'Гидрогеология
', 'online.edu.ru', '  Разделы курса:  Раздел I. Цели и задачи науки «Гидрогеология»   Общие сведения о гидросфере и ее роль в развитии цивилизации.  Гидрогеология как современная наука геологического цикла.  Связь гидрогеологии с другими естественнонаучными дисциплинами.  Задачи и объекты гидрогеологических исследований.   Раздел II. Круговорот воды в природе и его элементы.   Природные воды как вид минерального сырья.  Круговорот воды в природе и его роль в общей геологической эволюции Земли.  Составные элементы круговорота.  Уравнение водного баланса.  Роль вод в формировании месторождений полезных ископаемых.   Раздел III. Виды подземной гидросферы и методы их изучения.   Основные направления гидрогеологии и классификация видов подземных вод.  Теория происхождения подземных вод.  Строение подземной гидросферы и схемы строения водоносных горизонтов.  Виды гидрогеологических подразделений и зональность подземной гидросферы.   Раздел IV. Классификация подземных вод, их свойства и виды   Схема залегания подземных вод.  Воды зоны аэрации и грунтовые воды.  Межпластовые и артезианские воды.   Раздел V. Условия питания подземных вод и их типы.   Процессы пополнения и условия формирования подземных вод.  Области распространения подземных вод.  Области питания и разгрузки подземных вод.  Влияние техногенеза на распространение подземных вод.  Типы подземных вод.   Раздел VI. Элементы гидростатики и гидродинамики подземных вод.   Безнапорный характер залегания и движения подземных вод, схема строения.  Напорный характер залегания и движения подземных вод, схема строения.  Гидростатический напор и гидростатическое давление, скоростная высота  Понятие о пьезометрическом уровне напорных водоносных горизонтах и их напорность.   Раздел VII. Графическое отображение подземных вод.   Гидрогеологические разведочные работы и их цели и задачи.  Гидрогеологические планы.  Гидрогеологические разрезы, уровни водоносных горизонтов и гидрогеологические таблицы.  Использование графической документации для определения характера взаимодействия вод и разработки схем и способов дренирования.   Раздел VIII. Основные закономерности движения подземных вод.   Принципы движения (фильтрации) подземных вод, режимы фильтрации.  Количественная оценка процесса фильтрации.  Расход потока.  Понятие о единичном расходе и его практическое применение.   Раздел IX. Движение подземных вод к искусственным дренам.   Понятие о дренах и их разновидности.  Схема водопонижения и ее элементы.  Принципы расчета водопонижения методом «большого колодца».  Цели и задачи опытно-фильтрационных работ.   Раздел X. Особенности техногенного режима подземных и поверхностных вод при горных работах и в строительстве.   Факторы, влияющие на формирование техногенного режима и особенности формирования водопритоков в горные выработки.  Влияние подземных и поверхностных вод на условия разработки месторождений полезных ископаемых и строительные работы.  Классификация разрабатываемых месторождений по дренируемости.  Основные методы, средства и способы осушения карьерных и шахтных полей и строительных площадок.  Баланс, режим и запасы подземных вод; загрязнение подземных и поверхностных вод.  Проблема питьевой воды и перспективы разработки природоохранных технологий водопотребления.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3762');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (53, 'Современные образовательные технологии: новые медиа в классе
', 'online.edu.ru', '  Раздел I. Введение   Изменение философии образования.  Современная педагогика. Тенденции развития.  Учебная культура и её формирование.   Раздел II. Проектирование учебного процесса с использованием информационно-коммуникационных технологий (ИКТ)   Общие принципы и условия применения ИКТ.  Определение способов оценки деятельности учащихся.  Структура современного урока.  Подходы к проектированию урока.  Развитие профессиональной компетенции учителя в информационно-образовательной среде.  Оценка готовности к использованию ИКТ в учебном процессе.  Анализ существующих ресурсов и соотнесение их с конкретными фрагментами уроков.  Платформа "Открытая школа" как инструмент ИКТ.   Раздел III. Применение смешанного обучения (СО) в процессе использования информационно-коммуникационных технологий   Нормативно-правовые аспекты организации электронного обучения.  Понятие «смешанное обучение».  Предпосылки, проблемы, преимущества СО.  Модели СО.  Проектирование учебного процесса с использованием СО.  Методы повышения эффективности групповой работы.  Подготовительная работа с учениками.  Разработка эффективной среды обучения.  Управление обучением.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3764');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (54, 'Управление интеллектуальной собственностью - основы для инженеров
', 'online.edu.ru', '    Вводная часть.  Введение. Основные термины и понятия в области ИС. Интеллектуальные права.   Основы законодательства в области ИС.  Законодательство в области интеллектуальной собственности в РФ. Основные организации РФ в сфере интеллектуальной собственности. Международное законодательство в области ИС.   Основные объекты ИС и формы их охраны: объекты патентного права и средства индивидуализации.  Изобретения, полезные модели и дизайн: патентное право. Средства индивидуализации товаров, услуг и юридических лиц   Основные объекты ИС и формы их охраны: нетрадиционные объекты ИС и объекты авторского права.  Топологии ИМ, селекционные достижения, ноухау. Программы ЭВМ, базы данных, публикации: авторское право   Патент как форма охраны изобретения: детальное рассмотрение.  Подробнее о патентном праве: практические аспекты. Патентная заявка и процесс патентования изобретения. Структура и содержание патента: как читать современный патент.   Важнейшие качества объектов техники с позиции патентов.  Патентоспособность, патентная чистота и «сила патента». Неверные представления и иллюзии о патентах.   Патентные исследования: типы и способы проведения.  Типы патентных исследований и способы их проведения. Основные этапы проведения патентных исследований.   Патентные исследования: поиск патентов в базах данных сети интернет.  Патентный поиск в системе fips.ru. Патентный поиск в системе Espacenet. Патентный поиск в системе uspto.gov. Патентный поиск в системе Questel.   Патентные исследования: анализ патентной ситуации.  Анализ патентной ситуации: подробное описание.   Основные формы коммерциализации объектов ИС.  Экспертиза технологий перед коммерциализацией. Лицензирование технологий и создание стартап-компаний. Заключение.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3766');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (108, 'Психолингвистика
', 'online.edu.ru', '   Неделя 1.  Введение в психолингвистику  Неделя 2.  Происхождение языка  Неделя 3.  Ментальная грамматика и ментальный лексикон  Неделя 4.  Исследования порождения и восприятия звучащей речи  Неделя 5.  Исследования чтения и письма  Неделя 6.  Экспериментальные исследования текста  Неделя 7.  Исследования детской речи  Неделя 8.  Билингвизм  Неделя 9.  Нейролингвистические исследования. Заключение  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3913');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (55, 'Введение в материаловедение
', 'online.edu.ru', '  Модуль 1 Кристаллическое строение материалов  1.1 Материалы, их классификация и основные физические свойства  1.2 Атомная структура вещества, виды межатомных связей  1.3 Кристаллические решетки. Кристаллические и не-кристаллические материалы  1.4 Дефекты кристаллических решеток    Модуль 2 Методы исследования атомной и кристаллической структуры материалов  2.1 Дифракция на кристаллических решетках  2.2 Рентгенофазовый анализ  2.3 Дифракция электронов  2.4 Просвечивающая микроскопия высокого разрешения  2.5 Атомно-силовая микроскопия     Модуль 3 Фазовые превращения и полиморфизм кристаллических решеток и методы исследования кристаллических решеток.  3.1 Полиморфизм металлов и соединений  3.2 Агрегатные состояния вещества  3.3 Энергетические и температурные условия фазовых превращений  3.4 Основные механизмы и закономерности фазовых превращений  3.5 Термический анализ  Модуль 4 Фазовые равновесия и фазовые диаграммы  4.1 Основные понятия. Правило фаз. Классификация двойных систем  4.2 Граничные растворы на основе компонентов  4.3 Нонвариантные равновесия. Эвтектическое превращение  4.4 Промежуточные фазы  4.5 Системы с нонвариантными равновесиями твердых растворов на основе полиморфных модификаций компонентов  4.6 Методы построения фазовых диаграмм: построение на основе кривых охлаждения, моделирование    Модуль 5 Монокристаллы и поликристаллы  5.1 Монокристаллы и поликристаллы  5.2 Получение монокристаллов методами Бриджмена и Чохральского  5.3 Получение поликристаллических материалов  5.4 Высоко- и низкоугловые границы зерен  5.5 Наноструктурированные материалы.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3768');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (56, 'Сопротивление материалов
', 'online.edu.ru', '  • 1. Основные положения сопротивления материалов. Сдвиг и смятие; • 2. Геометрические характеристики плоских сечений; • 3. Центральное растяжение и сжатие. Теория; • 4. Центральное растяжение и сжатие. Практика; • 5. Кручение круглого бруса; • 6. Прямой изгиб. Теория; • 7. Прямой изгиб. Практика; • 8. Сложное сопротивление; • 9. Устойчивость сжатых стержней; • 10. Напряженно-деформируемое состояние в точке. Теория прочности;  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3772');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (57, 'Метрология
', 'online.edu.ru', '   Основные понятия метрологии.  Международная система единиц СИ.  Принцип, метод, методика измерений.  Классификация погрешностей измерений и средств измерений.  Погрешности средств измерений.  Статистические методы оценивания случайных погрешностей.  Методы обработки результатов прямых многократных измерений.  Оценивание и сравнение результатов измерений.  Методы обработки результатов косвенных измерений.  Обработка результатов совокупных и совместных измерений.  Неопределенность измерений.  Точность измерений в соответствии со стандартами ГОСТ Р ИСО 5725-1-6-2002.  Эталоны единиц величин.  Обеспечение единства измерений.  Законодательные основы метрологии.  Современные тенденции и перспективы.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3774');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (58, 'История и философия техники
', 'online.edu.ru', '   Раздел 1.  Металлургия Железного века (недели 1 и 2)   Древесный уголь  Тигельная плавка  Сыродутный горн    Раздел 2.  Металлы в мифологии (недели 3 и 4)   Мировоззренческая категория  Сакральный символизм металлов  Происхождение и распространение металлургических терминов    Раздел 3.  Мифология горного дела (недели 5 и 6)   Мифология горного дела  Горный фольклор  Металлургические ритуалы    Раздел 4.  Металлургия цветных металлов в Древнем мире (недели 7 и 8)   Металлургия свинца и серебра  Трубное производство  Санитария и гигиена  Монетное дело    Раздел 5 . Специальные сплавы Древнего мира (недели 9 и 10)   Металлические зеркала Древнего мира: магия и металлургия  От колесницы до подковы  Оружейная сталь  Дамасская сталь  Литая сталь  Закалка и термообработка   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3777');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (59, 'Процессы получения наночастиц и наноматериалов
', 'online.edu.ru', '   Часть 1. Классификация процессов получения наночастиц. Физико-химические основы способов получения наноразмерных порошков(НП). Аттестация НП.    Газофазный способ получения наноразмерных порошков (НП). Основные закономерности образования НП методом испарения и конденсации.  Конденсационный рост наночастиц (НЧ). Коагуляция и коалесценция НЧ.  Плазменный переконденсационный метод получения НП.  Плазмохимический способ получения НП.  Процессы получения наночастиц (НЧ) осаждением НП из растворов.  Получение НП термическим разложением и восстановлением металлсодержащих соединений.  Механический способ получения НП. Механосинтез.  Электровзрывной способ получения НП. Сравнительные свойства НП, полученных разными способами. Биографическое наследование ими свойств в зависимости от способа получения.  Аттестация наночастиц. Исследование состава, свойств, дисперсности.    Часть 2. Фуллерены, углеродные и неуглеродные нанотрубки.    История открытия фуллеренов. Механизмы формирования фуллероновой структуры. Модифицированные производные фуллеренов.  Способы получения углеродных нанотрубок (С-НТ) (дуговой, лазерно-термический, пиролитический). Механизмы роста С-НТ.    Часть 3. Физико-химические основы получения объёмных наноматериалов (НМ).    Классификация способов получения объёмных НМ. Наноразмерные пленки и покрытия, осаждаемые на подложке. Химическое осаждение наноструктурных покрытий из газовой фазы (CVD).  Физическое осаждение наноструктурных покрытий из газовой фазы (PVD).  Порошковая металлургия объёмных НМ. Формование НП.  Спекание НП для получения объёмных НМ.  Интенсивная пластическая деформация, как способ получения объёмных НМ. Способ получения объёмных НМ контролируемой кристаллизацией из аморфного состояния.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3779');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (60, 'Защита окружающей среды. Рециклинг. Часть 2
', 'online.edu.ru', '  Раздел 01. Тяжелые металлы   Биоаккумуляция и токсичность  Классификация и основные свойства  Тяжелые металлы в биосфере  Токсичные металлы. Ртуть и мышьяк  Токсичные металлы. Свинец и кадмий  Токсичные металлы. Шестивалентный хром   Раздел 02. Рециклинг цветных металлов. Часть №1   Лом цветных металлов.  Входной контроль металлолома  Подготовка металлолома к металлургическому переделу  Сортировка металлолома  Рециклинг алюминия  Рециклинг алюминия (продолжение)   Раздел 03. Рециклинг цветных металлов. Часть №2   Рециклинг меди  Рециклинг цинка  Рециклинг свинца  Рециклинг титана  Рециклинг благородных металлов  Рециклинг благородных металлов (продолжение)   Раздел 04. Урбоэкология. Часть №1   Точки социально-экономического роста  Точки социально-экономического роста (продолжение)  История городской среды и современные проблемы урбанизации планеты  Основные характеристики города  Устойчивое развитие городской среды  Экология городской среды   Раздел 05. Урбоэкология (часть II)   Литогенная основа городских территорий  Экологический след и Экологические коридоры  Восприятие городской среды  Архитектурно-строительная экология и бионика  Экологичные строительные материалы  Конструкционные и изоляционные материалы   Раздел 06. Урбоэкология (часть III)   Материалы для облицовки, кровли и внутренней отделки  Экологичные инженерные сооружения  Экологичные здания  Энергосберегающие и энергоактивные здания  «Умные» здания  Совершенствование городской среды   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3781');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (61, 'Защита окружающей среды. Рециклинг. Часть 1
', 'online.edu.ru', '  Курс состоит из трех разделов: Инженерная защита окружающей среды.  • Термины и определения. •  Выбросы в окружающую среду. • Обращение с отходами, вторичные ресурсы и рециклинг. Твердые бытовые отходы: рециклинг и депонирование. •  Твердые бытовые отходы. •  Переработка ТБО. •  Рециклинг вторичных ресурсов в рамках инициативы «3R». •  Рециклинг и утилизация твердых коммунальных отходов. • Рециклинг металлов. •  Металлы в техносфере. •  Рециклинг черных металлов. •  Рециклинг цветных металлов.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3783');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (166, 'Технология конструкционных материалов
', 'online.edu.ru', '  Раздел 1. Введение: Основные понятия. Классификация и свойства конструкционных материалов. Значение конструкционных материалов в машиностроении.  Раздел 2. Основы металлургического производства: Производство чугуна. Производство стали. Производство цветных металлов: меди, алюминия, титана.  Раздел 3. Обработка металлов давление: Физические основы ОМД. Прокатка. Прессование. Волочение. Ковка. Объемная штамповка. Листовая штамповка  Раздел 4. Литейное производство: Значение литейного производства в машиностроении. Виды литейных форм. Классификация литейных сплавов, их механические и литейные свойства. Технология изготовления отливок в песчано-глинистых формах  Раздел 5. Сварка: Сущность процесса образования сварного соединения. Классификация способов сварки. Классификация сварных швов. Классификация сварных соединений  Раздел 6. Обработка металлов резанием: Общая характеристика процесса. Токарная обработка. Фрезерование. Обработка на сверлильных станках. Шлифование.  Раздел 7. Полимерные материалы и композиты: Общие сведения о полимерах и их свойствах. Конструкционные пластические массы, их свойства, назначение основных компонентов. Способы получения изделий из полимерных материалов. Композиционные материалы на полимерной и металлической матрицах. Композиционные материалы на неорганической матрице: инфракерметы, и ультракерметы. Виды, свойства и применение керамических композиционных материалов  Раздел 8. Перспективы развития производства конструкционных материалов.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4050');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (62, 'Безопасность жизнедеятельности
', 'online.edu.ru', '   1. Введение в безопасность. Основные понятия, термины и определения;  2. Человек и техносфера;  3. Идентификация и воздействие на человека опасных и вредных факторов среды обитания. Часть №1;  4. Идентификация и воздействие на человека опасных и вредных факторов среды обитания. Часть №2;  5. Защита человека от опасных и вредных факторов природного, антропогенного и техногенного происхождения. Часть №1;  6. Защита человека от опасных и вредных факторов природного, антропогенного и техногенного происхождения. Часть №2;  7. Обеспечение комфортных условий для жизни и деятельности человека;  8. Психофизиологические и эргономические основы безопасности;  9. Чрезвычайные ситуации и методы защиты от них;  10. Управление безопасностью жизнедеятельности.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3785');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (63, 'Основы расчета строительных конструкций
', 'online.edu.ru', '   Модуль 1. Предпосылки к расчету строительных конструкций.   Тема 1. Конструктивные элементы и формирование строительных конструкций.  Тема 3. Основные этапы расчета строительных конструкций.   Модуль 2. Нагрузки и воздействия.   Тема 1. Классификация нагрузок и воздействий.  Тема 2. Сбор нагрузок в соответствии с СП «Нагрузки и воздействия»   Модуль 3. Расчет каменных конструкций.   Тема 1. Каменная кладка как материал.  Тема 2. Прочностные и деформационные характеристики каменной кладки.  Тема 3. Основные расчетные зависимости для каменных конструкций.  Тема 4. Расчет каменных конструкций.   Модуль 4. Расчет железобетонных конструкций.   Тема 1. Суть железобетона, формирование железобетонных элементов, классификация железобетонных элементов.  Тема 2. Прочностные и деформационные характеристики бетона и арматуры.  Тема 3. Расчет по несущей способности на поперечный изгиб.  Тема 4. Расчет по несущей способности на сжатие.  Тема 5. Особенности расчета монолитных конструкций.   Модуль 5. Расчет деревянных конструкций.   Тема 1. Дерево как строительный материал, классификация и сортамент лесоматериалов.  Тема 2. Работа древесины под нагрузкой.  Тема 3. Основные расчетные зависимости.  Тема 4. Соединения и узлы деревянных конструкций.   Модуль 6. Расчет металлических конструкций.   Тема 1. Расчет элементов.  Тема 2. Соединения и узлы металлоконструкций.  Тема 3. Расчет металлоконструкций.  Тема 4. Основные расчетные зависимости.  Тема 5. Соединения и узлы деревянных конструкций.   Модуль 7. Расчет фундаментов и грунтов основания.   Тема 1. Фундаменты и грунты основания.   Итоговая аттестация.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3788');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (64, 'Наука о данных и аналитика больших объемов данных
', 'online.edu.ru', '  Тема 1. Введение в большие данные: Определение больших данных и причины их появления. Примеры возможностей для бизнеса. Различие между Business Intelligence и Big Data  Тема 2. Жизненный цикл аналитики данных: Понятие жизненного цикла аналитики данных. Роли, необходимые для успешного создания проекта по аналитике данных  Тема 3. Высокопроизводительные вычисления: Распределенные вычисления на нескольких серверах, вычислительная парадигма MapReduce. Проект Apache Hadoop и его экосистема. Apache Spark и его компоненты. Вычисления в реальном времени, Apache Storm, Flink  Тема 4. Масштабирование и многоуровневое хранение данных: Теорема CAP. Парадигма NoSQL. Классификация NoSQL баз данных  Тема 5. Визуализация данных и результатов анализа: Техники визуализации данных, введение в язык R. Визуализация данных в R  Тема 6. Сложные методы аналитики: Классификация задач анализа: Text, Data, Web, Social Mining. Применение машинного обучения в аналитике. K-means и C-means кластеризация, классификация. Логистическая регрессия, ассоциации, алгоритм Априори.  Тема 7. Анализ текста: Поисковые механизмы: Lucene, Solr, ElasticSearch..Алгоритмы Work2Vec и Glove  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3792');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (65, 'Биомеханика
', 'online.edu.ru', '  Модуль 1. Реакции биологических тканей на механические воздействия.  Тема 1. Строение биологических тканей.  Тема 2. Реакции биологических тканей на внешние воздействия.  Модуль 2. Биомеханика различных систем организма  Тема 3. Биомеханика сосудистой системы.  Тема 4. Биомеханика сердца.  Тема 5. Биомеханика дыхательных путей.  Тема 6. Биомеханика опорно-двигательного аппарата.  Модуль 3. Биомеханика органов чувств.  Тема 7. Биомеханика слухового аппарата.  Тема 8. Биомеханика зрительного аппарата.  Модуль 4. Биомеханика заменителей биологических тканей и протезов органов.  Тема 9. Биомеханика тканевых заменителей.  Тема 10. Биомеханика протезов органов.  МОДУЛЬ 5. Подготовка к итоговой аттестация.  МОДУЛЬ 6. Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3795');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (66, 'Технологии управления бизнесом (часть 1: Математические методы в экономике)
', 'online.edu.ru', '   Тема 1.  Задачи принятия решений в экономике и их модельные представления  Тема 2.  Основы теории линейной оптимизации  Тема 3.  Методы решения общей задачи линейной оптимизации  Тема 4.  Специальные задачи линейной оптимизации  Тема 5.  Задача многокритериальной оптимизации, ее математическая модель и методы решения  Тема 6.  Игровые методы в экономике  Тема 7.  Графоаналитические методы принятия решений в экономике и управлении  Тема 8.  Многоэтапные методы принятия решений в экономике  Тема 9.  Имитационные методы в экономике  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3797');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (67, 'Делопроизводство (Документационное обеспечение)
', 'online.edu.ru', '   Введение    Модуль 1. Документирование      Тема 1.  Понятие о документах, системах документирования, носителях информации. Государственное регулирование делопроизводства.   Лекция 1.  Основные системы документации. Унифицированная форма документа. Унифицированные системы документации. Классификация документов. Нормативно-методическая база делопроизводства.     Тема 2.  Реквизиты организационно-распорядительной документации   Лекция 2.  Бланки организаций. Виды бланков, их назначение и функции.  Требования к их оформлению, хранению и использованию.   Лекция 3 . Состав, расположение и воспроизведение реквизитов на документах. Формуляр-образец. Изучение ГОСТ Р 7.0.97-2016.   Лекция 4.  Язык и стиль управленческого документа. Требования к тексту документа. Унификация текста. Виды унифицированного текста и методы унификации. Структура текста. Использование лексики в тексте документа.     Тема 3.  Требования к оформлению распорядительных и справочно-информационных документов.   Лекция 5 . Распорядительные документы: виды, назначение, состав реквизитов.   Лекция 6 . Справочно-информационные документы: виды, назначение, состав реквизитов.     Тема 4.  Деловые письма: классификация, оформление, работа с текстом.   Лекция 7.  Служебные письма: бланк для писем и состав реквизитов.   Лекция 8.  Разновидности писем. Особенности при составлении текста разных видов писем.  Особенности переписки с зарубежными партнерами.     Тема 5.  Требования к оформлению кадровых документов: трудовых договоров, кадровых приказов, заявлений и др.   Лекция 9.  Документы по персоналу: требования и порядок оформления кадровых документов.     Модуль 2. Документооборот      Тема 6 . Организация документооборота в государственных и муниципальных структурах   Лекция 10.  Документооборот, характеристика документопотоков, объем документооборота в организации.  Типовая инструкция по делопроизводству. Основные принципы организации документооборота в муниципальных структурах: оперативность, прямоточность, учет объема документооборота.     Тема 7.  Порядок обработки входящих, исходящих и внутренних документов.   Лекция 11.  Обязательные и рекомендуемые этапы прохождения входящих, исходящих и внутренних документов. Централизованная и децентрализованная регистрация входящих документов.     Тема 8.  Электронный документооборот   Лекция 12.  Межведомственный и внутриорганизационный электронный документооборот: принципы формирования и нормативные акты.     Тема 9.  Конфиденциальное делопроизводство   Лекция 13.  Защита информации на всех этапах документооборота.  Сведения, отнесенные к государственной тайне.  Сведения, отнесенные к негосударственной тайне: коммерческая тайна, служебная тайна, профессиональная, персональные данные.     Модуль 3. Архивное дело      Тема 10.  Основные понятия архивного дела.  Закон 125-ФЗ от 22.10.2004 «Об архивном деле» Типовые и ведомственные перечни управленческих документов.   Лекция 14.  Документы по архивному делу. Дело, номенклатура дел, определение сроков хранения документов в организации. Создание экспертной комиссии в организации: ее права и функции.     Тема 11.  Составление номенклатуры дел. Формирование документов в дела, оформление дела. Опись дел.   Лекция 15.  Систематизация документов и формирование дел в соответствии с Номенклатурой дел организации. Требования к систематизации документов в дела. Особенности и сроки формирования документов в дела. Оформление дел: титульный лист, внутренняя опись дела, лист - заверитель дела. Составление описи дел. Сроки и требования к проверке документов в делах.     Тема 12 . Подготовка к архивному хранению. Хранение и уничтожение документов.   Лекция 16 . Экспертиза ценности документов. Порядок уничтожения документов и оформления результатов экспертизы. Подготовка, оформление и передача дел в архив организации. Требования к документам при передаче дел в архив организации. Организация ведомственного хранения документов и обеспечения их сохранности. Требования к документам при передаче дел на государственное хранение.     Итоговая аттестация.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3799');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (167, 'Беспроводные телекоммуникационные системы
', 'online.edu.ru', '   РАЗДЕЛ 1. Модуляция и манипуляция   Тема 1. Модуляция сигналов  Тема 2. Аналитическое представление сигнала  Тема 3. Манипуляции сигналов  Тема 4. Широкополосные сигналы   РАЗДЕЛ 2. Методы разделения каналов   Тема 1. Частотное разделение  Тема 2. Временное разделение  Тема 3. Кодовое разделение  Тема 4. Разделение по ортогональным поднесущим  Тема 5. Пространственное кодирование сигналов   РАЗДЕЛ 3. Системы беспроводной связи   Тема 1. GSM  Тема 2. Wi-Fi  Тема 3. Bluetooth  Тема 4. LTE  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4052');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (68, 'Инженерная и компьютерная графика
', 'online.edu.ru', '   Курс «Инженерная и компьютерная графика» включает восемнадцать тем, объединенных в девять разделов (модулей):    Области применения компьютерной графики. Классификация, обзор и тенденции построения современных графических систем.  Основные принципы и функциональные возможности современных графических систем.  Стандарты в области разработки графических систем.  Технические средства компьютерной графики.  2D и 3D моделирование, способы и форматы создания, хранения, ввода и вывода графической информации.  Системы координат, типы преобразований графической информации.  Виды геометрических моделей их свойства, параметризация моделей; геометрические операции над моделями.  Геометрические операции над моделями.  Алгоритмы визуализации: отсечения, развертки, удаления невидимых линий и поверхностей, закраски.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3803');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (69, 'Концепции современного естествознания
', 'online.edu.ru', '   Естествознание в контексте человеческой культуры. научный метод  Основные этапы развития естествознания  Концепция детерминизма в классическом естествознании  Корпускулярная и континуальная концепции описания природы  Пространство и время в естествознании.  Статистические закономерности в природе. закон сохранения энергии в макроскопических процессах. принцип возрастания энтропии.  Квантовые представления в описании микромира  Строение вещества  Из чего сделан мир: на пути к фундаментальной теории материи  Эволюционные процессы в мегамире: наука о вселенной  Эволюция звезд  Наука о земле  Фундаментальные свойства живой материи.  Естествознание и научно-технический прогресс  Самоорганизация в живой и неживой природе.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3806');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (70, 'Цифровые устройства и микропроцессоры. Часть 2. Комбинационные и последовательностные устройства
', 'online.edu.ru', '  Введение   Модуль 1. Комбинационные цифровые устройства    Тема 1. Базовые логические функции и логические вентили  Тема 2. Шифраторы, дешифраторы и кодопреобразователи  Тема 3. Мультиплексоры, демультиплексоры и коммутаторы  Тема 4. Сумматоры и умножители  Тема 5. Cинхронные цифровые устройства    Модуль 2. Последовательностные цифровые устройства &lt;br&gt; Тема 6. Триггеры&lt;br&gt; Тема 7. Регистры&lt;br&gt; Тема 8. Счетчики&lt;br&gt; Тема 9. Память&lt;br&gt; Тема 10. Конечные автоматы   Модуль 3. Арифметика в фиксированной и плавающей точке &lt;br&gt; Тема 11. Представление чисел в фиксированной точке&lt;br&gt; Тема 12. Представление чисел в плавающей точке&lt;br&gt; Тема 13. Математические операции&lt;br&gt;   Модуль 4. Дополнительные вопросы проектирования цифровых устройств &lt;br&gt; Тема 15. Временной анализ цифровых устройств&lt;br&gt; Тема 16. Метастабильность&lt;br&gt; Тема 17. Цепи сброса&lt;br&gt; Тема 18. Вопросы быстродействия, количества ресурсов и энергопотребления&lt;br&gt; ема 19. Плохой стиль проектирования ЦУ  Перечень лабораторных работ   Создание рабочего проекта. Реализация логических вентилей  Реализация шифраторов, дешифраторов и кодопреобразователей  Реализация мультиплексоров, демультиплексоров и коммутаторов  Реализация простейших сумматора и умножителя. Использование IP ядер  Цикл разработки и его цели  Синхронные и асинхронные триггеры  Реализация регистров и устройств на их основе. Моделирование работы цифровых устройств  Кольцевой и реверсивный счетчики  Одно- и двухпортовая память RAM/ROM  Реализация конечных автоматов  Скользящее среднее  Согласованный фильтр  Фильтр нижних частот   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3808');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (71, 'Управление данными
', 'online.edu.ru', '  1. Введение. Обобщенная архитектура систем баз данных 2. Этапы проектирования БД, понятие модели данных, обзор основных моделей данных 3. Реляционная модель данных: допустимые структуры, ограничения 4. Реляционная алгебра: операции и примеры 5. Нормализация. Нормальные формы 1-3 6. НФБК и старшие нормальные формы 7. Модель сущность-связь, ER-диаграммы Чена, Мартина и Баркера, IDEF1x 8. IDEF1x (продолжение), IE, использование CASE-средств, переход от логической модели к физической 9. История SQL, подъязыки (DDL, DML …), типы данных, некоторые функции, создание домена/пользовательского типа, создание таблицы, определение ограничений 10. SQL: добавление, изменение, удаление, записей (INSERT, DELETE,UPDATE, MERGE) 11. Оператор SELECT, составление простых запросов, выборка данных из нескольких таблиц 12. Подзапросы. Реализация теоретико-множественных операций реляционной алгебры средствами SELECT 13. Представления 14. Транзакции 15. Переменные, операторы, временные таблицы 16. Хранимые процедуры, функции, курсоры, триггеры  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3810');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (72, 'Экономика предприятия. Часть 1
', 'online.edu.ru', '   Введение.   Модуль 1. Введение в экономику предприятия.    Организационно-правовые основы функционирования предприятия.   1. Структура национальной экономики. Предприятие как первичное звено экономики. 2. Предприятие как субъект предпринимательской деятельности. 3. Организационно-правовые и организационно-экономические формы предпринимательской деятельности. 4. Производственный процесс, организационная и производственная структура предприятия. 5. Принципы, типы и формы организации производства. 6. Производственная программа и производственная мощность.  Модуль 2. Ресурсы предприятия.  7. Внеоборотные активы. Основные средства предприятия. 8. Оборотные средства предприятия. 9. Трудовые ресурсы предприятия. 10. Затраты предприятия.  Модуль 3. Доходы, прибыль и рентабельность деятельности.  11. Выручка, прибыль и рентабельность. 12. Ценовая политика предприятия.  Модуль 4. Основы управления предприятием.  13. Основы управления предприятием. 14. Эффект и эффективность. Методы оценки экономической эффективности.  Итоговая аттестация.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3814');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (198, 'Русский язык как инструмент успешной коммуникации
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4218');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (199, 'Гениальность. Одаренность. Посредственность
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4274');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (73, 'Экономика предприятия. Часть 2. Налогообложение юридических лиц
', 'online.edu.ru', '   Введение    Модуль 1. Основы налогообложения юридических лиц в Российской Федерации  1. Базовые понятия и определения. 2. Общие подходы к исполнению налоговой обязанности. 3. Понятие налогового контроля и налоговой ответственности. 4. Информационные и телекоммуникационные технологии в налогообложении.   Модуль 2. Исчисление, уплата, планирование налоговых платежей организациями   5. Налог на добавленную стоимость. 6. Акцизы. 7. Налог на имущество организаций. 8. Налог на прибыль организаций. 9. Налог на доходы физических лиц. 10. Страховые взносы в социальные фонды. 11. Налог на добычу полезных ископаемых. 12. Прочие налоговые платежи. 13. Налоги, уплачиваемые в рамках специальных налоговых режимов.   Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3820');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (74, 'Общая теория связи. Вероятностные модели сигналов и систем
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Случайные события и их вероятности.  Случайные величины и их законы распределения.  Числовые характеристики случайных величин.  Основные статистические характеристики.  Функциональные преобразования случайных величин.  Моделирование случайных объектов.  Случайные сигналы.  Экспериментальное определение характеристик случайных сигналов.  Цифровая обработка сигналов.  Случайные последовательности.  Фильтрация случайных последовательностей   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3824');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (75, 'Управление человеческими ресурсами
', 'online.edu.ru', '   Введение    Модуль 1. Система управления человеческими ресурсами  1. Понятие и система управления человеческими ресурсами 2. Кадровая политика предприятия 3. Правовые основы управления человеческими ресурсами   Модуль 2. Технологии управления человеческими ресурсами  4. Набор и отбор персонала 5. Подбор персонала 6. Адаптация персонала 7. Наставничество и консультирование 8. Оценка персонала 9. Аттестация персонала 10. Обучение персонала 11. Расстановка персонала 12. Система мотивации персонала. Методы прямого материального стимулирования персонала 13. Методы косвенного материального и морального стимулирования персонала   Модуль 3. Анализ эффективности системы управления человеческими ресурсами  14. Оценка эффективности использования человеческих ресурсов 15. Социально-экономическая оценка эффективности кадровых мероприятий   Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3826');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (76, 'Производственный менеджмент
', 'online.edu.ru', '   Введение.    Модуль 1. Содержание и эволюция концепций управления производственной деятельностью.   1. Общая концепция операционного/пр оизводственного менеджмента. Эволюция концепций менеджмента.   Модуль 2. Организация подготовки производства новой продукции.   2. Рыночно ориентированная подготовка производства новой продукции.   Модуль 3. Организация производственного процесса на предприятии.   3. Производственный процесс и его структура, организационные типы производства.  4. Производственный цикл простого и сложного процесса.  5. Производственная мощность предприятия.  6. Проектирование размещения предприятий и их производственных мощностей.  7. Проектирование производственной структуры предприятия.  8. Организация производственных процессов непоточными методами.  9. Организация производственных процессов поточными методами.  10. Организация обслуживающих производств на предприятии.   Модуль 4. Внутризаводское планирование.   11. Методология планирования производства.  12. Связь корпоративной и оперативной бизнес-стратегий предприятия.  13. Методы и модели агрегатного планирования производства.  14. Системы оперативного планирования производства.  15. Концепция создания комплексной автоматизированн ой системы управления производством.   Итоговая аттестация.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3828');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (77, 'Логистика
', 'online.edu.ru', '   Глава 1. Понятие и виды логистики    Понятие и роль логистики в управлении цепями поставок  Эволюция управления цепями поставок, управление конфликтами в цепях поставок  Компоненты логистической системы. Принципы рациональной организации логистических процессов  Виды логистики и их функции    Глава 2. Управление цепями поставок    Разработка стратегии цепи поставок  Управление динамикой в цепи поставок. Роль запасов и информации  Производственные стратегии  Структура системы планов предприятия    Глава 3. Управление спросом    Процессы управления спросом  Принципы прогнозирования спроса  Методы прогнозирования спроса  Процесс прогнозирования спроса    Глава 4. Производственная логистика    Главный календарный план производства  Планирование потребности в материалах (MRP)  Планирование потребности в мощностях (CRP)  Оперативное управление исполнением планов производства    Глава 5. Гармонизация спроса и производства    Стратегическое согласование спроса и производства – разработка операционной стратегии  Тактическое согласование спроса и производства – процесс среднесрочного планирования продаж и операций  Укрупнённое планирование потребности в мощностях для главного календарного плана производства  Доступное для обещания количество и доступная для обещания мощность    Глава 6. Закупочная логистика, часть I    Понятие, значение, цели и задачи закупочной логистики  Организация закупочной деятельности на предприятии  Планирование потребности в материалах  АВС, XYZ – анализ материалов    Глава 7. Закупочная логистика, часть II    Управление поставщиками  Оперативное управление поставками материалов  Системы JIT, VMI и MRP в закупочной логистике  Оперативный учет движения материалов на складе и контроль за уровнем их запасов    Глава 8. Управление запасами    Общая концепция материальных запасов  Управление запасами номенклатурных позиций (часть 1)  Управление запасами номенклатурных позиций (часть 2)    Глава 9. Складская логистика    Основные понятия и тенденции развития складской логистики  Топология складской сети  Зонирование и типы систем хранения  Ключевые проблемы управления складом    Глава 10. Транспортная логистика, часть I    Место транспортировки в логистической концепции и основные понятия, связанные с транспортными системами  Основные типы и характеристики транспортных систем  Экономические оценки на транспорте, транспортные издержки и транспортные тарифы  Грузы, грузопотоки и их свойства    Глава 11. Транспортная логистика, часть II    Инфраструктура транспортных систем  Транспортные операторы и услуги транспорта  Функции транспортной логистики. Мультимодальные и интермодальные перевозки  «Зеленая» логистика    Глава 12. Таможенная логистика    Общие положения  Транспорт и базис поставки  Таможенное оформление  Экономические расчеты    Глава 13. Распределительная логистика    Роль распределительной логистики  Управление каналами распределения  Запасы в каналах распределения  Планирование потребности в распределении    Глава 14. Информационные системы в логистике, часть I    Основные понятия и тенденции развития информационных систем  Краткая характеристика рынка информационных систем    Глава 15. Информационные системы в логистике, часть II    WMS-системы  TMS-системы  СRM-системы. EDI-системы  Выбор, внедрение и оценка эффективности информационных систем   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3831');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (78, 'Логика и теория аргументации
', 'online.edu.ru', '  Программа курса включает 19 тематических занятий, каждое из которых предполагает лекционные материал, практические задания и задание для самостоятельной работы учащегося:   Предмет и значение логики  Понятие как форма мышления  Логические операции с понятиями  Суждение как форма мышления  Логический анализ вопросов  Сложное суждение  Операции над сложными суждениями  Логический квадрат  Логический закон  Модальные суждения  Умозаключение как форма мышления  Непосредственные дедуктивные умозаключения  Простой категорический силлогизм  Сложные и сокращенные силлогизмы  Дедуктивные умозаключения из сложных посылок  Недедуктивные умозаключения  Проблема, гипотеза и теория и их место в научном познании  Доказательство и опровержение  Стратегия и тактика аргументации   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3833');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (79, 'Менеджмент
', 'online.edu.ru', '   Введение.    Модуль 1.   Основы теории управления организацией.    Общая концепция организации и менеджмента организации.  Внешняя и внутренняя среда организации.  Пирамида управления организацией.  Стратегии бизнеса в XXI веке.    Модуль 2.   Функции менеджмента: планирование (стратегия и тактика, политика и процедуры), организация работ и координация коллективов, перманентный контроль их деятельности и оперативное руководство.    Планирование на предприятии.  Организационные отношения в системе менеджмента.  Роль и функции руководителя в пирамиде управления. Контроль в системе менеджмента.    Модуль 3.   Принятие управленческих решений: методы математической оптимизации и искусство руководителя.    Процесс принятия управленческих решений; методы математической оптимизации решений.  Групповые методы выработки решений.  Функциональный менеджмент в различных сферах деятельности организации.    Модуль 4.   Факторы и способы мотивации труда подчиненных.    Мотивация деятельности в менеджменте: формы и факторы мотивации.  Методы экономической мотивации труда на микро- и макроуровне.    Модуль 5. Социальная психология менеджмента; самоменеджмент.    Организационный конфликт.  Лидерство и власть в системе менеджмента.  Эффективный менеджер.    Итоговая аттестация.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3835');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (80, 'Маркетинг
', 'online.edu.ru', '   Модуль 1. Маркетинговая среда    Тема 1. Введение в маркетинг   1.1. Определения и основные категории маркетинга 1.2. Развитие концепций маркетинга   Тема 2. Конкуренция   2.1. Конкуренция как рыночное явление 2.2 Рыночная структура как среда конкуренции 2.3. Модели конкуренции 2.4. Конкурентные стратегии и конкурентные преимущества 2.5. Источники конкурентных преимуществ 2.6. Анализ конкурентов и конкурентоспособности  Модуль 2. Поведение потребителей    Тема 3. Поведение потребителей товаров широкого потребления   3.1. Сегментация на В2С рынках 3.2. Факторы, влияющие на поведение потребителей на В2С рынках   Тема 4. Поведение потребителей на организационных (деловых) рынках   4.1. Современные тенденции на В2В рынках 4.2. Сегментация на В2В рынках 4.3. Принятие решений о закупках на В2В рынках 4.4. Relationship marketing – маркетинг партнерских отношений  Модуль 3. Маркетинговые исследования    Тема 5. Качественные маркетинговые исследования   5.1. Основные категории маркетинговых исследований 5.2. Типы маркетинговых исследований 5.3. Этапы маркетингового исследования 5.4. Методы качественных маркетинговых исследований   Тема 6. Количественные маркетинговые исследования   6.1. Основные понятия количественных маркетинговых исследований 6.2. Оценка показателей рынка 6.3. Поиск вторичной маркетинговой информации 6.4. Комбинированные маркетинговые исследования  Модуль 4. Маркетинговый комплекс    Тема 7. Ассортимент и номенклатура товаров и услуг предприятия   7.1. Виды продукта: продукция, услуги, особенности и классификации 7.2. Номенклатура и ассортимент 7.3. Цели, сущность и этапы управления продуктом и его жизненным циклом 7.4. Анализ ассортимента: ABC, XYZ, BCG   Тема 8. Разработка продукта   8.1. Классификация продуктов по уровню новизны 8.2. Методы разработки нового продукта 8.3. Идея и концепция продукта, их разработка 8.4. Проверка концепции продукта 8.5. Позиционирование   Тема 9. Брендинг   9.1. Основные категории брендинга 9.2. Атрибуты бренда 9.3. Модели бренда 9.4. Управление брендом   Тема 10. Дистрибуция   10.1. Сущность и основные категории дистрибуции 10.2. Факторы, определяющие структуру логистических каналов 10.3. Каналы распределения 10.4. Мерчандайзинг   Тема 11. Ценообразование   11.1. Базовые понятия ценообразования 11.2. Факторы ценообразования 11.3. Методы ценообразования   Тема 12. Комплекс маркетинговых коммуникаций и реклама   12.1. Состав комплекса маркетинговых коммуникаций 12.2. Реклама 12.3. Медиапланирование   Тема 13. Управление личными продажами   13.1. Определения и основные концепции в управлении личными продажами 13.2. Организационные структуры управления личными продажами 13.3. Customer Relationship Management (CRM) системы управления взаимоотношениями с клиентами 13.4. Процесс продаж и техники продаж 13.5. Оценка деятельности отдела продаж   Тема 14. Стимулирование продаж и связи с общественностью   14.1. Направления и методы стимулирование продаж 14.2. Направления и методы деятельности по связям с общественностью.  Модуль 5. Управление маркетингом    Тема 15. Управление маркетингом   15.1. Стратегический и операционный маркетинг 15.2. Маркетинговое планирование и оценка эффективности маркетинга 15.3. Организационные структуры управления маркетингом 15.4. Международный маркетинг  Модуль 6. Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3838');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (81, 'Современная промышленная электроника
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3842');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (82, 'Атомная энергетика. Введение
', 'online.edu.ru', '   Введение . Роль атомной энергетики в обеспечении человечества энергией. Ее доля в энергетическом балансе. Современное состояние атомной энергетики в России и в мире.Проблема вывода из эксплуатации отработавших свой срок энергоблоков АЭС   Модуль 1. Основы ядерной физики и физики ядерного реактора      Тема 1. Физические основы ядерной энергетики. Ядерный реактор и физические процессы в его активной зоне.          Лекция 1. Строение атомов, ядер и их устойчивость. Ядерные реакции. Замедление и диффузия нейтронов        Лекция 2. Цепная реакция деления ядер. Коэффициент размножения нейтронов. Реактивность реактора   Модуль 2. Классификация ядерных энергетических установок (ЯЭУ)      Тема 2. ЯЭУ с разными типами реакторов.          Лекция 3. Ядерный топливный цикл        Лекция 4. Классификация ядерных реакторов по различным признакам. Основные типы реакторов в атомной энергетике России.        Лекция 5. Тепловые схемы АЭС с разными типами реакторов. Отвод тепла из активной зоны реактора. Основы теплогидравлического расчета      Тема 3. Получение и использование рабочего пара на АЭС          Лекция 6. Физические процессы, связанные с производством пара на АЭС. Парогенераторы разных типов. Опыт эксплуатации парогенераторов        Лекция 7. Турбоустановки АЭС: сепараторы-пароперегреватели        Лекция 8. Турбоустановки АЭС: схемы турбины, конденсаторы, оборудование машинного зала   Модуль 3. Безопасность АЭС и системы ее обеспечения       Тема 4. Системы обеспечения безопасности АЭС          Лекция 9. Системы управления и защиты ядерных реакторов        Лекция 10. Проблемы безопасности при использовании атомной энергии        Лекция 11. Принципы обеспечения безопасности АЭС. ДАБ. ВАБ        Лекция 12. Системы безопасности АС        Лекция 13. Системы пассивного отвода теплоты на АЭС      Тема 5. Аварии на АЭС          Лекция 14. Виды возможных аварий на АЭС        Лекция 15. Анализ аварий на АЭС мира     Тема 6. Хранение и транспортирование ядерного топлива          Лекция 16. Хранение отработавшего ядерного топлива        Лекция 17. Транспортирование отработавшего ядерного топлива      Тема 7. Вопросы дозиметрии и защиты от ионизирующих излучений          Лекция 18. Защита от ионизирующего излучения на АЭС   Модуль 4. Перспективы использования атомной энергетики       Тема 8. Дополнительные возможности использования атомной энергетики          Лекция 19. Энерготехнологическое использование ядерных реакторов        Лекция 20. Почему человечество не сможет выжить без атомной энергии?   Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3844');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (109, 'Публичная дипломатия США
', 'online.edu.ru', '   Неделя 1.  Публичная дипломатия США как инструмент внешней политики и научное направление   Неделя 2.  Цифровая дипломатия США   Неделя 3.  Новые тенденции в публичной дипломатии США: Администрации Б. Обамы и Д. Трампа   Неделя 4.  Ближний Восток: провалы и успехи публичной дипломатии США   Неделя 5.  Постсоветское пространство и Восточная Европа в публичной дипломатии США   Неделя 6.  Россия и Русский мир в публичной дипломатии США   Неделя 7 . Образование и университеты зарубежных стран в публичной дипломатии США   Неделя 8.  Документальная основа для создания экспертной оценки проектов публичной дипломатии США  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3917');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (83, 'Физическая культура
', 'online.edu.ru', '   Тема 1. Общая концепция теории и методики физической культуры    Лекция 1. Введение в теорию физической культуры  Лекция 2. Физическое воспитание, как центральная категория физической культуры    Тема 2. Социально-биологические основы физической культуры, диагностика и здоровый образ жизни    Лекция 3. Психофизиологические аспекты адаптации человека  Лекция 4. Физиологические и биохимические основы физической культуры    Тема 3. Самостоятельная двигательная активность    Лекция 5. Методические основы самостоятельной физической тренировки  Лекция 6. Самоконтроль занимающихся физическими упражнениями  Лекция 7. Здоровый образ жизни студента    Тема 4. Средства, формы и методы физической культуры в профессиональной деятельности человека    Лекция 8. Основы профессионально-прикладной физической подготовки    Тема 5. Спорт - интегративный фактор физической подготовки    Лекция 9. Структура и социальные функции спорта   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3846');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (84, 'Проектирование зданий. BIM
', 'online.edu.ru', '  РАЗДЕЛ 1. ОСНОВЫ ПРОЕКТИРОВАНИЯ ЗДАНИЙ И СООРУЖЕНИЙ. BIM.   Разделы и стадии проектирования  BIM/VDC как ключ к решению проблем проектирования   РАЗДЕЛ 2. СОЗДАНИЕ ИНФОРМАЦИОННОЙ МОДЕЛИ   Поиск архитектурных форм  Объемно-планировочные решения  Конструктивные решения  Знакомство с Autodesk Revit.  Информационное моделирование зданий с использованием архитектурных и конструктивных элементов в Autodesk Revit.  Основы проектирования инженерных систем зданий  Информационное моделирование зданий с использованием элементов инженерных систем  Требования, предъявляемые к проектной документации  Подготовка проектной документации в Autodesk Revit  Визуализация информационной модели здания  BIM координация проекта   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3848');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (85, 'Основы технологии машиностроения
', 'online.edu.ru', '  Вкурсе рассматриваются следующие темы:  Введение.  1. Технологическая подготовка производства (ТПП).  2. Точность механической обработки.  3. Базы ибазирование вмашиностроении.  4. Качество поверхностного слоя деталей. Расчёт припусков.  5. Проектирование технологических процессов механической обработки исборки.  6. Изготовление деталей класса валов.  7. Изготовление деталей класса втулок идисков.  8. Изготовление корпусных деталей.  9. Изготовление зубчатых колёс.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3850');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (86, 'Академическое русское письмо
', 'online.edu.ru', '  Разделы курса:  1. Что такое современный научный стиль речи 2. Жанры научных публикаций. Элементы научной публикации 3. Виды научных журналов. Элементы научного журнала. Публикационная политика, этика и практика 4. Научная инфраструктура: библиографические базы данных 5. Как написать научную статью. Полезные советы 6. Как оформить научную статью. Ссылки, примечания, списки. Библиографические менеджеры 7. Институт рецензирования. Принцип peer review. Как написать рецензию 8. Как подготовить доклад на конференции. Как написать и опубликовать статью по материалам доклада 9. Прочие виды научной публикационной активности 10. Научная дискуссия и академическое общение   На прохождение каждого раздела отводится 1 неделя. По завершении недели обучения слушатели должны выполнить 1 обязательное экзаменационное задание.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3852');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (87, 'Арабский язык. Вводный курс
', 'online.edu.ru', '    МОДУЛЬ 1. Введение. Графика и фонетика. Категории имени. Состояние и род.  МОДУЛЬ 2. Склонение. Число. «Встреча».  МОДУЛЬ 3. Служебные части речи. Местоимения. «Знакомство»  МОДУЛЬ 4. Словосочетания. «В гостинице».  МОДУЛЬ 5. Именное предложение, вопросительное предложение. «Прогулка по городу».  МОДУЛЬ 6. Имя прилагательное. «Университет».  МОДУЛЬ 7. Глагол. Основные типы глагола. Спряжение глагола. «В ресторане».  МОДУЛЬ 8. Породы глагола. Наклонения. «Путешествие / Виды транспорта».  МОДУЛЬ 9. Масдар. Причастие. Имя числительное. «Покупки»  МОДУЛЬ 10. Залог. Отрицание в глагольном предложении. «Арабский мир»    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3854');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (310, 'Основания алгебры и геометрии
', 'online.edu.ru', '   Натуральные числа  Принцип математической индукции  Язык логики и теории множеств  Делимость  Цепные дроби  Комплексные числа  Построения циркулем и линейкой  Евклидова и неевклидова геометрия  Аксиомы Гильберта: инцидентность и порядок  Аксиомы Гильберта: конгруэнтность, параллельность, полнота  Векторные и аффинные пространства  Теория множеств   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979695');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (88, 'Введение в биоинформатику: метагеномика
', 'online.edu.ru', '   1. Вводная лекция.     описание метагеномных сообществ различной природы  что такое метагеномика, где обитают микробные сообщества  как их анализируют, особенности контроля качества, где и как используются полученные знания  контрольные вопросы и задания по ходу лекции для закрепления терминологии и небольшая контрольная в конце (идет в зачет)    2. Получение экспериментальных данных для метагеномных проектов    NGS технологии для метагеномики  WGS - полногеномный сиквенс  данные (data generation approaches) для 16S анализа разнообразия изучаемого сообщества  форматы данных для последующего анализа  контрольные вопросы и задания по ходу лекции для закрепления терминологии и небольшая контрольная в конце (идет в зачет)    3. Аналитические подходы: 16S анализ    оценка качества данных для 16S, 18S анализа  анализ с помощью баз данных 16S – алгоритмы и подходы  построение филогенетических деревьев на основе 16S данных и их визуализация (термины, параметры, оценки надежности и т.д.)  таксономическая представленность  контрольные вопросы и задания по ходу лекции для закрепления терминологии и небольшая контрольная в конце (идет в зачет)    4. Аналитические подходы: бининг    значение и применение  алгоритмы (тетрануклеотидный анализ, кластеризация, GC%)  визуализация результатов анализа  интерпретация полученных результатов  контрольные вопросы и задания по ходу лекции для закрепления терминологии и небольшая контрольная в конце (идет в зачет)    5. Аналитические подходы: полногеномная сборка и gene centric сборка    что такое сборка, чем в случае метагеномов она отличается от сборки изолятов  алгоритмы – сложности и особенности  gene centric сборка и случаи ее применения  практический модуль, на реальных примерах знакомящий слушателей с работой сданными  визуализация  контрольные вопросы и задания по ходу лекции для закрепления терминологии и небольшая контрольная в конце (идет в зачет)    6. Аннотация и анализ метаболических путей    что происходит после сборки и аннотации  программы, созданные для метаболического анализа  работа онлайн в реальном времени с данными реальных экспериментов  контрольные вопросы и задания по ходу лекции для закрепления терминологии и небольшая контрольная в конце (идет в зачет)    7. Заключение    о чем курс  чему научились  что осталось за кадром  перспективы метагеномных исследований     ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3856');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (89, 'Неорганическая химия: введение в химию элементов
', 'online.edu.ru', '   Занятие 1.  Периодический закон. История открытия Периодического закона. Попытки систематизации элементов(Деберейнер, Ньюлендс, де Шанкуртуа, Мейер). Формулировка ПЗ Менделеева. Структура Периодической системы.Основные закономерности. Правило четности, диагональное сходство. Предсказание свойств, пустые ячейки. Сравнение экасилициума и германия. Признание ПЗ. Современные представления принципа периодичности. Связь ПЗ со строением атома, современная формулировка ПЗ. Формы Периодической Системы элементов – Менделеева, Сиборга, Бора. Плюсы и минусы. Развитие Периодического закона. Типические элементы, концепция кайносимметрии. Гипервалентные связи.   Занятие 2.  Водород. Две элементарные частицы – протон и электрон. Самый распространенный элемент во Вселенной.Водород на Земле и в солнечной системе. Солнечный ветер. Уникальное электронное строение атома. Характеристики атома: потенциал ионизации, сродство к электрону. Изотопы водорода: протий, дейтерий, тритий. Ядерный синтез.Водородная бомба. Водород как простое вещество. Двухатомная молекула, ее характеристики: длина связи, энергия связи.Схема МО. Возможность существования H2+, H2-. Тяжелый водород (заметное отличие свойств, изотопный эффект). Орто и параводород. Получение молекулярного водорода. История открытия. Лабораторные способы. Примеси при получении водорода при реакции металлов с кислотами. Получение водорода в промышленности. Химические свойства молекулярного водорода. Водород как окислитель. Водород как восстановитель (экзотермичность, теплоноситель). Кинетическая инертность молекулярного водорода. Водород «в момент выделения». Опыт Марша. Бинарные соединения с водородом. От ионных к молекулярным гидридам. Схемы МО LiH и HF. Комплексные гидриды: катионные NH4+, PH4+, H3O+.Анионные: BH4-, AlH4-, Al(BH4)3. Кислотно-основные реакции бинарных водородных соединений. Неустойчивость гидридов в водных растворах. Конпропорционирование H+ + H- = H2. Водородные связи. Уникальность (размер) протона.Трехцентровое взаимодействие. Линейность фрагментов HF2-. Температуры кипения аммиака, HF, воды. Межмолекулярные водородные связи. Водородные связи в биологических системах: ДНК, РНК. Диводородные связи.Изоэлектронные этан и амминборан. Различие свойств (дегидрирование).   Занятие 3.  Кислород. Кислород как простое вещество. История открытия, происхождение названия, содержание кислорода на Земле (аномально высокое содержание), физические свойства. Кислород как простое вещество. Электронное строение атома кислорода.Валентные возможности кислорода. Аллотропия кислорода. Озон. Строение молекулы, схема МО парамагнетизм. Кислород в биологических системах. Связывание молекулярного кислорода в комплексы. Опыты с жидким кислородом (горение сигареты, взрыв губки) и получение озона. Горение железа в кислороде и в озоне. Оксиды. Определение оксидов. Различные классификации оксидов. Оксиды как производные атома кислорода. Отсутствие кислорода в оксидах в степени окисления-1. Ионные оксиды. Местоположение в периодической системе. Особенности строения. Взаимодействие с водой.Молекулярные оксиды. Особенности строение и летучесть. Сложные оксиды. Соли кислородсодержащих кислот, как продукт взаимодействия двух оксидов. Промежуточные оксиды. ВТСП, магнитные свойства. Высокотемпературная керамика. Пероксиды. Устойчивость иона O22-. История открытия, общие свойства пероксидов. Пероксид водорода.Строение молекулы. Получение и свойства перекиси водорода. Пероксиды щелочных металлов как соли перекиси водорода.Пероксиды в органических соединениях. Необычные степени окисления кислорода. Ион кислорода O2- . Супероксиды,озониды. Соединения кислорода в положительных степенях окисления. Фториды кислорода. Ион О2+. Диоксигенил.   Занятие 4.  Вода. Строение молекулы воды. Электронное строение молекулы воды как фактор, определяющий тенденции к образованию водородных связей. Жидкая вода. Современные представления о структуре жидкой воды. Водные растворы.Образование растворов. Учение Д.И. Менделеева о растворах. Доказательства химической природы растворов. Гидратация.Гидратация одноатомных ионов и Периодический закон. Термохимия процессов гидратации и Периодический закон.Изменение растворимости солей в рамках групп Периодической системы. Взаимодействие воды с простыми и сложными(на примере оксидов) веществами. Взаимодействие воды с простыми веществами. Растворимость газообразных простых веществ в воде. Окислительно-восстановительное взаимодействие простых веществ с водой. Взаимодействие оксидов с водой. Влияние степени ионности оксида на продукты взаимодействия. Сила кислородсодержащих кислот. Правила Полинга. Изменение силы кислородсодержащих кислот по группе П.С. Изменение силы бескислородных кислот в группе П.С., его причины. Основания как продукт взаимодействия ионных оксидов с водой. Сила оснований и Периодический закон. Гидролиз – обменное взаимодействие веществ с водой. Гидратированные ионы как протолиты. Гидролиз как результат поляризации молекул воды в первой гидратной сфере: симбатность изменений ионизационных потенциалов, поляризующей способности и константы гидролиза в рамках групп П.С. Гидролитическая полимеризация. Процессы оляции и оксоляции.Периодическая система форм гидроксокомплексов в растворе. Окислительно-восстановительные свойства воды. Вода как окислитель и как восстановитель. Общие правила запрета на существование окисленных (восстановленных) форм в водных растворах. Восстановительные потенциалы и Периодический закон. Вода как сырье для водородной энергетики.Актуальные проблемы: управление состоянием вещества в растворе как способ синтеза материалов с заданными свойствами.   Занятие 5.  s-элементы. Щелочные металлы. Общие свойства щелочных металлов. Нахождение в природе, основные соединения. Свойства атомов. Особенности изменения восстановительных потенциалов вниз по группе. Физические свойства. Взаимодействие натрия и калия с водой и кислородом. Щелочные металлы в отрицательных степенях окисления. Натриды и электриды. Элементы 2й группы. Общие свойства элементов 2й группы. Классификация элементов2й группы. Химия бериллия. Амфотерность соединений бериллия. Комплексы бериллия. Взаимодействие магния и кальция с водой. Взаимодействие солей бериллия с кислотой и щелочью. Диагональное сходство. Причины возникновения.Особенности химии лития и магния. Литийорганические соединения. Реактивы Гриньяра. Роль натрия и калия, магния и кальция в биологических системах. Актуальные проблемы: Li-ионные аккумуляторы.   Занятие 6.  2p-элементы. Типические элементы у Д.И. Менделеева. Кайносимметрия 2р-элементов: в чем она проявляется: 1) 2р-орбитали 2) все элементы – неметаллы; 3) к.ч.≤4; 4) способность к образованию кратных связей; 5) специфика фтора и кислорода. Общая характеристика 2р-элементов. Способность к образованию σ и π-связей. Изменение размеров атомов,потенциалы ионизации, электронные конфигурации, сродство к электрону, ЭО. Нарастание неметаллических свойств при горизонтальном сопоставлении р-элементов. Образование σ и π-связей. Ранние и поздние элементы. Физические и химические свойства простых веществ. Тпл, кип. Агрегатное состояние Молекулы F2, N2 (схемы МО). Сопоставление химической активности поздних 2р-элеменnов. Ранние 2р-элементы: углерод, бор. Аллотропные модификации.Химические свойства. Водородные соединения 2р-элементов. Строение. Гибридизация. Изменение кислотно-основные свойств по периоду (от HF к CH4). Особенности гидридов бора. Фториды бора и азота. Отношение к воде. CF4 - кинетическая инертность. Ионные и молекулярные фториды. Кислотно-основной характер. Фториды инертных газов. Электроноизбыточные связи. Оксиды 2р-элементов. Кратные связи в оксидах.Оксиды NO, СО, ВО в методе МО. Димеризация NO. Ион NO+.Оксид бора (BO)x, B2O3. CO2. NO2. Кислотно-основные свойства оксидов. Высшие кислородсодержащие кислоты H3BO3, H2CO3, HNO3, /HOF/. Особенности кислорода и фтора.Бориды, карбиды, нитриды. Состав. Свойства. Техническое использование.   Занятие 7.  p-элементы. Общая характеристика р-элементов. Электронные конфигурации. Степени окисления. Правило четности и нечетности.Формы соединений. Увеличение к.ч. с появлением d-орбиталей. Возможности dπ- pπ перекрывания. Тенденции в изменении свойств простых веществ при движении вниз по группе. Характер изменения базовых характеристик (r, I, E,ЭО) по группе. Простые вещества. Физические и химические свойства. Тенденции в изменении свойств соединений при движении вниз по группе. Изменение устойчивости, кислотно-основных, окислительно-восстановительных свойств водородных соединений и их производных по группе. Кислородсодержащие гидратированные формы. Амфотерность.Кислоты поздних элементов. Состав, сила, окислительная способность. Соли. Вторичная периодичность. Электронное строение. Неустойчивость высших соединений брома, селена, мышьяка. Окислительные свойства соединений Tl(III), Pb(IV), Bi(V). Диагональное сходство. Кислород-хлор. Оксохлориды. Бор-кремний. Боросиликатные структуры. Стекла.Бериллий-алюминий. Амфотерность. Предсказание состава и свойствбинарных соединений. Например, Sn-Se, Pb-S, In-Br, S-F, S-Cl , Ge-O, Sn-O. Занятие 8. Введение в координационную химию. Теория Вернера, особенности строения координационных соединений.Геометрия комплексов, примеры. Типы изомерии в координационной химии. Описание электронного строения координационных соединения. Теория кристаллического поля. Октаэдрическое и тетраэдическое расщепление орбиталей.Окраска и магнитные свойства комплексов. Высокоспиновые и низкоспиновые комплексы. Спектрохимический ряд.Эффект Яна-Теллера. Плоско-квадратные комплексы. Теория поля лигандов.   Занятие 9.  3d-элементы. Свойства элементов и простых веществ. Легкие переходные элементы. Распространенность в природе. Основные минералы – сродство к кислороду и сродство к сере. Электронное строение атомов. Важнейшие характеристики элементов:ионизационный потенциал, сродство к электрону. 3d-элементы как кайносимметрики. Изменение плотности и температуры плавления простых веществ. Изменение высшей степени окисления в ряду легких переходных металлов и факторы, определяющие высшую степень окисления. Химические свойства простых веществ, закономерности их изменения в ряду 3d-элементов. Способы получения простых веществ, факторы, определяющие возможность их реализации. Соединения переменного состава. Причины их образования. Оксиды и гидроксосоединения. Формы оксо- и гидроксосоединений. Факторы, определяющие представительность плеяд этих соединений. Кислотно-основные свойства оксо-гидроксосоединений в ряду легких переходных элементов. Влияние положения элемента в П.С. и степени окисления металла на кислотно-основные свойства соединений. Окислительно-восстановительные свойства оксо-гидроксосоединений и их производных. Влияние среды. Ионы в водных растворах. Влияние степени окисления металла на форму существования ионов в водных растворах. Титанил- и ванадил-катионы. Гидролиз ионов железа. Галогениды 3d-металлов. Представительность плеяд галогенидов легких переходных металлов и факторы, ее определяющие. Влияние степени окисления металла на свойства галогенидов. Комплексы легких переходных металлов. Высокоспиновые и низкоспиновые октаэдрические комплексы, доминирование высокоспиновых. Конкуренция октаэдрических и тетраэдрических комплексов. Отражение ЭСКП на характеристиках высокоспиновых комплексов. Ряд Ирвинга-Вильямса. Горизонтальное сходство в ряду 3d-элементов. Комплексы 3d-металлов в биологических системах. Гемоглобин, другие металлокомплексы. Комплексы меди и перенос кислорода.   Занятие 10.  4,5d-элементы. Общая характеристика тяжелых металлов. Особенности электронного строения тяжелых d-металлов. Лантаноидное сжатие.Причины сходства в химическом поведении. Сравнение окислительное-восстановительных свойств и устойчивых степеней окисления тяжелых d-элементов с 3-d металлами. Триады хром-молибден-вольфрам, марганец-технеций рений.Стандартные восстановительные потенциалы. Сравнение поведения 3d и тяжелых металлов в водных растворах. Низкие степени окисления тяжелых d-элементов. Кластерообразование. Связь металл-металл. Структура кластерных каркасов. Образование изо- и гетерополианионов на примере хрома, молибдена и вольфрама. Анионы Кеггина, Доусона и Андерсена. Влияние размера гетероатома на структуру аниона. Платиновые металлы. Особенное положение в периодической системе. Схожесть характеристик в триадах. Плоскоквадратные комплексы. Эффект транс-влияния. Актуальные проблемы: Комплексы Pd как катализаторы органических реакций.   Занятие 11.  f-элементы. Лантаноиды. Электронное строение. Кайносимметрия. Лантаноидное сжатие. Цериевая и иттриевая группа. Химия лантаноидов. Нахождение в природе. Получение и разделение лантаноидов. Реакционная способность простых веществ. Наиболее устойчивые степени окисления. Оксиды, гидроксиды, галогениды. Особенности химии Ce, Eu,Tb,Yb.Актиноиды. Электронное строение. Ураниды и кюриды. Изменение свойств по ряду 5f элементов. Химия актиноидов.Характерные степени окисления. Химия водных растворов. Иловые ионы. Особенности комплексов актиноидов (отсутствие связи М-М). Границы периодической системы. Синтез новых элементов.Сверхтяжелые элементы. Островок стабильности. Границы периодической системы. Сейчас полностью завершен 7 период(Og)! Актуальные проблемы: люминесцентные комплексы лантаноидов.   Занятие 12.  Итоговое занятие. ПЗ в современной химии. Предсказание свойств и реакционной способности соединений. Разбор примеров: H2SO3 + H2SeO3; SnCl2 + Bi(NO3)3 + NaOH. Актуальные проблемы: химическое осаждение из газовой фазы.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3859');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (90, 'Китайский язык для начинающих
', 'online.edu.ru', '  Курс состоит из вводной лекции по фонетике и 10 основных недель (см. описание курса).  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3862');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (91, 'Китайский язык для начинающих. Часть 2.
', 'online.edu.ru', '  Модуль 1 «Встреча в аэропорту. Вечеринка».  Модуль 2 "Приглашение на культурное мероприятие"  Модуль 3 "Опоздание. Выражение сожаления"  Модуль 4 "Комплимент. Поздравление"  Модуль 5 "Советы и рекомендации"  Модуль 6 "Сравнение"  Модуль 7 "Изучение языка"  Модуль 8 "Путешествия"  Модуль 9 "Происшествия"  Модуль 10 "Прощание"  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3865');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (92, 'Процесс принятия политического решения: агенты и технологии
', 'online.edu.ru', '   Отличительные особенности современного механизма государственного управления  Принятие публичных политических решений как современное воплощение тренда на демократизацию общества  Теоретические предпосылки понимания процесса принятия политических решений (организационная теория и дискурс "политическая система")  Органы государственной власти как инициатор и стержень принятия и осуществления политических решений  Партия как важнейший альтернативный актор участвующий в процессе принятия политических решений  НПО как форма организованного общественного участия в социальном и политическом управлении  Формы общественного участия в процессе принятия политического решения  Роль СМИ как института формирования общественного мнения  Лоббирование как технология реализации групповых интересов: два подхода к пониманию их роли в обществе  Экспертиза как технология участия научного сообщества в процессе принятия политических решений   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3868');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (93, 'Дизайн-методология: управление вдохновением
', 'online.edu.ru', '  Модуль 1. Дизайн. Модуль 2. Определение концепта. Модуль 3. Семиотическое моделирование. Модуль 4. Дискурсивное моделирование. Модуль 5. Культурная анимация. Модуль 6. Реконструкция концепций дизайн-продуктов. Модуль 7. Оформление и презентация концепции. Модуль 8. Примеры концепций, разработанных по методологии СДМ.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3870');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (94, 'Базы данных
', 'online.edu.ru', '  Неделя 1. Вводная лекция, в которой рассказано об основном содержании курса, о разделах курса, о месте баз данных для различных информационных систем. Неделя 2. Проектирование баз данных. Модель «Сущность-связь». Неделя 3. Реляционная алгебра. Нормализация реляционных отношений. Неделя 4. Основные объекты базы и их описание на языке SQL. Неделя 5. Запросы на языке SQL. Неделя 6. Представления, процедуры, функции, триггеры. Неделя 7. Индексирование данных. Неделя 8. Оптимизация выполнения запросов. Неделя 9. Управление конкурентным доступом. Неделя 10. Направления и тенденции развития баз данных. Современные подходы к обработке Big Data.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3874');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (135, 'Лазерные технологии
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Введение. Лазерные технологии в промышленности  Физические основы лазерных технологий, лазерное нагревание  Физические основы лазерных технологий, лазерное разрушение  Основные параметры лазеров технологического назначения  Лазеры технологического назначения, их типы  Оптические системы для работы с лазерами. Фокусировка лазерного излучения  Оптические системы для работы с лазерами. Проекция лазерного излучения  Лазерная резка  Лазерное сверление отверстий  Лазерная сварка и пайка  Лазерная термообработка  Лазерная обработка тонких пленок (ЛОТП)   Каждая тема предполагает изучение в течение одной недели. На 3-й, 6-й, 7-й, 9-й и 11-й неделях запланированы расчетные задания по пройденному материалу. На 7-й и 11-й неделях запланированы виртуальные лаборатории.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3977');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (95, 'История русской письменности
', 'online.edu.ru', '  1. Письмо как знаковая система и система культурных кодов (Знаковая природа письма. Языковой фидеизм и сакрализация письма в культуре. Фасцинационная функция алфавита) 2. Возникновение письменности (Типы письма: пиктография, идеография, силлабография, буквенно-звуковое письмо. Отступление от буквенно-звукового типа в русском письме. Гетерограммы. Изобретение и наследование письма в мировой культуре) 3. История создания славянской азбуки (Политические предпосылки возникновения славянской письменности. Глаголица и кириллица. История сложения современного русского алфавита: борьба с лишними буквами и появление новых графем. История буквы ё. Филологические споры о составе русского алфавита. Орфографическая реформа 1917–1918 гг. Включение в современный текст букв дореформенного русского алфавита и элементов латиницы) 4. Соотношение между звуком и буквой в русской графике. (Связь алфавита с системой фонем языка. Слоговой принцип графики и сферы его действия. Нарушения и ограничения слогового принципа графики в современном русском письме. Попытки корректировки орфографических правил, связанных с нарушениями и ограничениями слогового принципа) 5. Русская орфография как система (Русская орфография как система правил. Разделы орфографии. Принципы русской орфографии. Сложение теории русской орфографии. Работа Орфографической комиссии РАН и орфографическая реформа 1917-1918 гг. Работа по корректировке свода правил в ХХ в. «Правила русской орфографии и пунктуации. Полный академический справочник» (2006) 6. Принципы, на которых базируется система правил современной русской орфографии (Морфологический принцип русской орфографии. Фонетический принцип русской орфографии. Традиционный принцип русской орфографии. Принцип морфолого-графических аналогий в современном русском письме. Дифференцирующие написания в современном русском письме) 7. Правила слитных, раздельных и полуслитных написаний и правила употребления строчных и прописных букв (История сложения принципов выбора контакта/дефиса/пробела в русском письме. Критерии выбора контакта/дефиса/пробела в современном русском письме. Правила употребления строчных и прописных букв) 8. Неалфавитные знаки в современном русском письме (Функции дефиса в современном русском письме. Функции апострофа в современном русском письме. Знак слеш и его роль в современной русской письменности) 9. Русская пунктуация как система (Понятие о пунктуации. Принципы пунктуации в современном русском письме. Краткая история знаков препинания. Коммуникативная роль пунктуации. Семантизация знаков препинания в сознании носителей языка. Вариативность современной русской пунктуации) 10. Графическая стилистика (Графические средства выразительности. Понятие параграфемики. Приемы графической выразительности)  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3879');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (96, 'Введение в физиологию
', 'online.edu.ru', '   Неделя 1.Физиология как наука.  Внутренняя среда организма. Ионная асимметрия. Транспорт ионов, органических веществ и воды через плазматическую мембрану клеток. Транспорт ионов, органических веществ и воды через эпителий. Передача сигнала в клетке. Сигналинг.   Неделя 2. Физиология возбудимых тканей.  Мембранный потенциал, его происхождение. Ионные каналы мембран. Локальный ответ. Критический уровень деполяризации. Потенциал действия, его фазы, их происхождение. Рефрактерность и ее причины. Электротонические изменения мембранного потенциала. Генераторный потенциал. Рецепторный потенциал. Синапс. Механизм передачи возбуждения в химических синапсах. Возбуждающий и тормозный постсинаптический потенциал. Механизм проведения нервного импульса по безмиелиновым и миелиновым нервным волокнам.   Неделя 3. Нервная регуляция функций в организме.  Нейрон как структурно-функциональная единица нервной системы. Взаимодействие между процессами возбуждения и торможения как основа интеграции сигнала. Механизмы интеграции сигналов в нервной системе. Окклюзия и облегчение. Моносинаптический рефлекс. Полисинаптическаие рефлекс.   Неделя 4. Физиология нервно-мышечной передачи.  Нервный ствол и типы нервных волокон. Типы мышечной ткани: скелетная, сердечная и гладкая мышцы. Особенности строения и физиологических свойств. Фазные и тонические волокна. Изоформы тяжелых цепей миозина: быстрые и медленные типы волокон. Мотонейрон и двигательные единицы. Проприорецепция. Структурно-функциональная организация нервно-мышечного синапса позвоночных. Типы секреции медиатора: вызванная и спонтанная квантовая секреция, неквантовая секреция. Квантовый состав. Молекулярные основы секреции квантов медиатора. Никотиновый холинорецептор. Потенциал концевой пластинки. Гарантийный фактор нервно-мышечной передачи. Роль Na, K-АТФазы.   Неделя 5. Физиология мышечного сокращения.  Дигидропиридиновые рецепторы, рианодиновые рецепторы. Роль ионов Са2+. Структура саркомера. Основные белки миофибрилл. Механизм мышечного сокращения. Изометрическое и изотоническое сокращение. Зубчатый и гладкий тетанус, пессимум.   Неделя 6. Автономная нервная система.  Структурно-функциональные особенности соматической и вегетативной нервной системы. Симпатический, парасимпатический и метасимпатический отделы вегетативной нервной системы. Принципы организации афферентного и эфферентного звена вегетативных рефлексов. Влияние симпатического, парасимпатического и метасимпатическо-го отделов вегетативной нервной системы на иннервируемые органы. Участие вегетативной нервной системы в интеграции функций при формировании целостных поведенческих актов. Вегетативные компоненты поведения.   Неделя 7. Гипоталамо-гипофизарная система и эпифиз.  Гипоталамо-гипофизарная система (структуры). Гормоны гипоталамо-нейрогипофизарной системы. Семейство Пролактина и соматотропина. Семейство тиротропина и гонадотропинов. Семейство проопиомеланотропина. Эпифиз и его гормоны.   Неделя 8. Гормоны периферических эндокринных желез.  Гормоны щитовидной и паращитовидных желез. Гормоны поджелудочной железы. Гормоны надпочечников. Гипоталамо-гипофизарно-надпочечниковая система. Глюкокортикостероиды и стресс. Гормоны половых желез.   Неделя 9.Общие проблемы физиологии сенсорных систем.  Характеристика общих вспомогательных структур сенсорных систем. Определение и классификация сенсорных рецепторов. Трансформации энергии раздражающего стимула в электрическую активность сенсорных рецепторов – рецепторный потенциал, а также механизмы его генерации и трансформации в импульсную активность (аналого-цифровое преобразование). Проведение электрических сигналов, возникающих в сенсорных рецепторах при действии энергии адекватного стимула. Механизмы усиления разрешающей способности и чувствительности сенсорных систем, а также механизмы обработки сенсорной информации и представительство различных сенсорных систем в коре головного мозга.   Неделя 10. Психофизиологические аспекты функционирования сенсорных систем.  Связь между параметрами энергии раздражающего стимула и характеристиками ощущения, возникающего в сенсорных системах: психофизические законы Вебера-Фехнера, закон Стивенса. Физиология центральной нервной системы. Электрические сигналы ЦНС. Роль подкорковых структур в регуляции функций организма. Кора больших полушарий головного мозга. Колонки. Зеркальные нейроны. Биология поведения.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3881');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (97, 'Ислам: история, культура, практика
', 'online.edu.ru', '   Ислам :  история  ,   культура   и   практика    Модуль   I  .  Аравия в доисламский период;   Модуль   II  .  Коран и начало ислама;   Модуль   III  .  Основные источники вероучения и права. Формирование основных школ мусульманского права;   Модуль   IV  .  Религия и политика в раннем мусульманском государстве;   Модуль   V  .  Первые мусульманские династии;   Модуль   VI  .  Аскетические и мистические движения в исламе ( суфизм );   Модуль   VII . Арабо-мусульманская философия:  калам  и  фалсафа ;   Модуль   VIII  .  Религиозная политика «пороховых империй» Нового времени. Мир ислама в эпоху модерна и европейской колониальной экспансии;   Модуль   IX  .  Повседневный ислам: базовые принципы и практики ислама;   Модуль X.  Искусство ислама.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3884');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (98, 'Жития святых и источники по истории Русской православной церкви
', 'online.edu.ru', '  Курс состоит из 8 модулей, и продолжаться будет 8 недель  Модуль 1. Житие как литературный жанр  Модуль 2. Свято-Владимирский цикл  Модуль 3. Жития свв Бориса и Глеба, сыновей св. Владимира  Модуль 4. Агиограф преп. Нестор Печерский  Модуль 5. Киево-Печерский патерик  Модуль 6. Князья-мученики татаро-монгольской эпохи  Модуль 7. Князья-победители. Александр Невский и Довмонт Псковский  Модуль 8. Агиографы Епифаний Премудрый и Пахомий Серб  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3887');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (99, 'Живые процессы русской разговорной речи
', 'online.edu.ru', '   Модуль 1:  Введение; аспекты изучения живой речи и образцы материала; Система, норма, узус, ненорма; Внутриязыковая интерференция (теория и конкретные результаты исследования).  Модуль 2:  Специфика разговорной речи (введение); Метапонятия грамматики речи; Метакоммуникация (монолог vs. диалог).  Модуль 3:  Русское слово в языке и речи; Русское слово в языке и ментальном лексиконе; БЛИН в зеркале языковой эволюции.  Модуль 4:  БАБЕЦ/БАБЦА; ЧУВАК; ПО ХОДУ; ПО ЧЕСНОКУ.  Модуль 5:  Русское слово и его потенциальные возможности; ВСЕ ДЕЛА; СКАЖЕМ ТАК… (постановка проблемы); СКАЖЕМ ТАК… (анализ материала).  Модуль 6:  КАК ЕГО (ЕЕ, ИХ); ЭТО САМОЕ (маркер поиска); ЭТО САМОЕ (другие маркеры); НЕ ЭТО САМОЕ.  Модуль 7:  ТИПА (ТОГО ЧТО); ЗНАЕШЬ/ЗНАЕТЕ; КОРОЧЕ (ГОВОРЯ); ГОВОРЯ.  Модуль 8:  Маркеры-аппроксиматоры – заменители перечисления; Словарь прагматем; КАК ГОВОРИТСЯ/ЧТО НАЗЫВАЕТСЯ.  Модуль 9:  ТЕТЯ МОТЯ (1); ТЕТЯ МОТЯ (2); (Я) (НЕ) ДУМАЮ (ЧТО); Грамматические новации.  Модуль 10:  Редуцированные формы русской речи – источник пополнения лексикона; Редуцированные формы русской речи – этапы лексикализации; Редуцированные формы русской речи – фонетические причины.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3889');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (100, 'Латинский язык. Начальный курс
', 'online.edu.ru', '  Вводная лекция  I. 1. Алфавит. Правила чтения  2. Глагол – общие сведения. Основные формы, основы, личные окончания действительного залога  3. Praesens indicativi activi. Imperativus praesentis activi. Формы запрещения  4. Имя существительное – общие сведения. Падежи. Первое склонение  5. Личные местоимения. Возвратное местоимение  II 1. Второе склонение (мужской род)   2.Второе склонение (средний род). Правило среднего рода   3. Прилагательные I–II склонения. Притяжательные местоимения  4. Страдательный залог. Личные окончания страдательного залога. Praesens indicativi passivi. Infinitivus praesentis passivi  5. Действительная и страдательная конструкции. Ablativus auctoris. Ablativus instrumenti  III 1. Местоимения ille; iste; ipse  2. Imperfectum indicativi activi et passivi  3. Местоимение is, ea, id. Местоименные прила­гатель­ные  4. Futurum primum indicativi activi et passivi  5. Приставочные глаголы с “esse”  IV 1. Третье склонение: согласный тип  2. Третье склонение: гласный тип  3. Третье склонение: смешанный тип  3. Третье склонение: прилагательные  4. Особенности третьего склонения  5. Participium praesentis activi  V 1. Функции инфинитива. Оборот Accusativus cum infinitivo (начало)  2. Оборот Nominativus cum infinitivo (начало)  3. Perfectum indicativi activi  4. Participium perfecti passivi. Perfectum indicativi passivi  5. Местоимения qui, quae, quod  VI 1. Plusquamperfectum et futu­rum secundum indicativi activi et passivi.  2. Ablativus absolutus  3. Сравнительная степень сравнения прилагательных и наречий. Ablativus comparationis.  4. Превосходная степень сравнения прилагательных. Genetivus partitivus  5. Четвёртое склонение  VII 1. Пятое склонение  2. Местоимение hic, haec, hoc  3. Participium futuri activi. Инфинитивы  4. Оборот Accusativus cum infinitivo (продолжение)  5. Числительные  VIII 1. Gerundium  2. Gerundivum как определение  3. Coniugatio periphrastica. Описательное спряжение.  4. Неправильные глаголы – eo, fero  5. Неправильные глаголы – volo, nolo, malo  IX 1. Modus coniunctivus – образование форм  2. Coniunctivus в независимых предложениях  3. Студенческий гимн «Gaudeamus»  4. Правило постановки времен в придаточных предложениях с конъюнктивом  5. Косвенный вопрос  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3891');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (101, 'Задачи и техника лингвистической экспертизы
', 'online.edu.ru', '  Разделы курса:  1. Проблемы исследования прагматической направленности информационных материалов. 2. Основные единицы языка и основные единицы речи, представленные в тексте. 3. Коммуникативно-риторический метод исследования текста, применяемый в лингвистических экспертизах. 4. Коммуникативные задачи и целевая установка текстов экстремистской направленности. 5. Задачи и цель функционально-прагматического анализа. 6. Функционально-понятийные типы риторических пропозиций. 7. Техника семантического анализа предложений и коммуникативного синтеза высказываний. 8. Синтез понятийно-риторических единиц содержания текста. 9. Поэтапное проведение и оформление экспертного исследования. 10. Анализ ошибок, допускаемых при назначении и производстве экспертиз.  На прохождение каждого раздела отводится 1 неделя. По завершении недели обучения слушатели должны выполнить 1 обязательное экзаменационное задание.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3895');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (102, 'Язык современной рекламы и СМИ
', 'online.edu.ru', '  1. Язык публицистики и норма литературного языка 2. Актуальные процессы в современном русском языке 3. Автор и адресат в современных СМИ 4. Риторическая модальность текстов СМИ. Языковые и речевые приемы убеждения 5. Манипулятивные технологии в текстах СМИ. Языковые и речевые приемы манипулирования 6. Речевая организация модульного рек-ламного текста. Манипулятивные приемы в рекламе 7. Лингвости-листические приемы в рекламных и медиатекстах 8. Цитатность и прецедентность текстов рекламы и СМИ 9. Типичные ошибки в язы-ке рекламы и СМИ 10. Языковая и речевая агрессия в СМИ. Черный пиар  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3897');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (103, 'Высшая математика. Алгебра: введение в теорию групп
', 'online.edu.ru', '   Неделя 1. Вводная лекция   Неделя 2. Основные определения и примеры    Определение группы, простейшие свойства групп, примеры групп;  Подгруппы, порождение подгрупп, циклические группы;  Классы смежности, индекс подгруппы, теорема Лагранжа.    Неделя 3.    Двойные смежные классы, формула индекса Фробениуса;  Нормальные подгруппы и фактор-группы;  Классы сопряженности.    Неделя 4. Гомоморфизмы групп    Определение и примеры гомоморфизмов, ядро и образ, теорема о гомоморфизме;  Теоремы об изоморфизме, строение группы автоморфизмов.    Неделя 5. Группы перестановок    Симметрическая группа, циклы, транспозиции;  Знак перестановки и знакопеременная группа.    Неделя 6. Действия групп на множестве    Определение и примеры действий групп;  Орбита, стабилизатор, неподвижные точки;  Классификация действий групп;  Лемма Бернсайда и комбинаторные приложения.    Неделя 7. Коммутаторы и коммутант    Коммутаторы и коммутант, тождества с коммутаторами;  Коммутант симметрической и полной линейной групп.    Неделя 8. Произведения групп, разрешимость и нильпотентность    Прямые и полупрямые произведения групп, расширения;  Ряды подгрупп, разрешимые и нильпотентные группы.    Неделя 9. p-группы и теоремы Силова    p-группы, теорема Коши о существовании элементов простого порядка;  Теоремы Силова с доказательствами.    Неделя 10. Задание групп образующими и соотношениями    Свободные группы, соотношения в группах;  Примеры задания групп образующими и соотношениями: циклические и диэдральные группы, S4 и A4.    Неделя 11. Геометрические примеры групп    Группы кос и их задание образующими и соотношениями;  Кокстеровское задание групп перестановок;  Группы, порожденные отражениями.    Неделя 12. Классификация групп малых порядков    Классификация групп, порядок которых делится на малое количество простых чисел;  Классификация групп порядка 8 и 12;  Классификация простых групп порядка 60.    Неделя 13. Завершающая лекция и итоговый экзамен   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3901');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (104, 'Математические методы в психологии. Основы применения
', 'online.edu.ru', '  Модуль 1.Введение  Модуль 2. Таблицы и Графики. Первичные описательные статистики.  Модуль 3. Нормальное распределение в психологии. Основы статистического вывода  Модуль 4. Анализ частот  Модуль 5. Сравнение двухвыборок  Модуль 6. Корреляционный анализ  Модуль 7. Введение в многомерные методы  Модуль 8. Дисперсионный анализ  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3903');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (105, 'Язык современной публицистики
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3905');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (106, 'Ядерная физика
', 'online.edu.ru', '   Модуль 1.   Общие свойства ядер  Модуль 2.  Ядерные данные и информатика  Модуль 3.  Ядерные силы и структура ядер  Модуль 4.  Ядерные реакции  Модуль 5.  Ядерные реакции. Часть II  Модуль 6.  Взаимодействие излучения с веществом  Модуль 7.  Радиоактивность и ядерная спетроскопия  Модуль 8.  Радиоактивность и ядерная спетроскопия. Часть II  Модуль 9.  Нейтронная физика  Модуль 10.  Ультрахолодные нейтроны и измерение времени жизни нейтрона  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3908');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (107, 'Психология сознания
', 'online.edu.ru', '  Неделя 1 Введение. Сознание в ореоле вечных проблем Неделя 2 Пестрота подходов к проблеме сознания в истории психологии Неделя 3 Рациональность сознания (Закон Юма) Неделя 4 Реакция сознания на неожиданность (Закон разрыва Шаблона) Неделя 5 Работа сознания по вытеснению и сглаживанию противоречий (Закон Фрейда-Фестингера). Неделя 6 Процессы классификации как способ преодоления противоречий Неделя 7 Как ведет себя сознание, если противоречий нет (Закон Джеймса) Неделя 8 Законы последействия Неделя 9 Заключение. Вечные проблемы в ореоле сознания Неделя 10 Контрольное задание по курсу  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3910');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (110, 'Русский как иностранный
', 'online.edu.ru', '   Неделя 1. Путешествие. Рассказ о себе. Семейные традиции и обычаи.  Видеосюжет. Подкаст Читаем по-русски Грамматика   Неделя 2. Путешествие. Рассказ о себе. Семейные традиции и обычаи.  Аудирование Говорим по-русски Общаемся на русском языке.   Неделя 3. Знакомство с городом. Прогулка по городу. Культурные и исторические памятники.  Видеосюжет. Подкаст Читаем по-русски Грамматика   Неделя 4. Знакомство с городом. Прогулка по городу. Культурные и исторические памятники.  Аудирование Говорим по-русски Общаемся на русском языке.   Неделя 5. Здоровый образ жизни. На стадионе. В спортивном клубе.   Видеосюжет. Подкаст Читаем по-русски Грамматика   Неделя 6. Здоровый образ жизни. На стадионе. В спортивном клубе.  Аудирование Говорим по-русски Общаемся на русском языке.   Неделя 7. Увлечения. Виды увлечений. Социальный опрос.   Видеосюжет. Подкаст Читаем по-русски Грамматика   Неделя 8. Увлечения. Виды увлечений. Социальный опрос.  Аудирование Говорим по-русски Общаемся на русском языке.   Неделя 9. Здоровье человека. Проблемы экологии. Движения волонтеров.  Видеосюжет. Подкаст Читаем по-русски Грамматика   Неделя 10. Здоровье человека. Проблемы экологии. Движения волонтеров.  Аудирование Говорим по-русски Общаемся на русском языке.   Неделя 11. Современная Россия: история и экономика. Деятели культуры и науки.  Видеосюжет. Подкаст Читаем по-русски Грамматика   Неделя 12. Современная Россия: история и экономика. Деятели культуры и науки.  Аудирование Говорим по-русски Общаемся на русском языке   Неделя 13. Россия: государственные и народные праздники. Что я узнал(а) о России.  Видеосюжет. Подкаст Читаем по-русски Грамматика   Неделя 14. Россия: государственные и народные праздники. Что я узнал(а) о России.  Аудирование Говорим по-русски Общаемся на русском языке.  Сourse program  The course consists of 14 weeks, in which you can summarize your knowledge of the topics included in the Standard TRKI-1:  I. Travel. Telling about yourself; II. Getting to know the city. A walk in the town. Cultural and historical monuments; III. Healthy lifestyle. At the stadium. In the sports club; IV. Hobbies. Types of hobbies. Social survey; V. Human health. Ecological problems. Volunteering; VI. Contemporary Russia: history and economics. Cultural and scientific figures; VII. Russia: state and folk holidays.  Each topic includes: ■ a situational-topical minimum: oral speaking genres (watching video lectures, listening to the podcast, speaking and writing assignments); ■ authentic texts for reading and listening; ■ grammar, which provides understanding and production of the texts, according to the level B1 (description, narration, instruction, argumentation, explanation); ■ assignments to each of the parts, as well as peer-assignments, which gives the opportunity to demonstrate the ability to create one’s own oral and written texts and assess other learners.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3919');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (111, 'Социология труда
', 'online.edu.ru', '  1. Возникновение и развитие научных идей о труде  2. Труд как социологическая категория.  3. Историческое развитие труда и его общественных форм.  4. Процессы трансформации труда в современном мире.  5. Общественное разделение труда.  6. Организация и рационализация труда.  7. Мотивация и стимулирование труда.  8. Рынок труда.  9. Виды и формы занятости.  10. Труд в пространстве современного общества.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3923');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (112, 'Экология почвенных беспозвоночных
', 'online.edu.ru', '  Онлайн-курс состоит из десяти недель изучения:  Раздел 1. Особенности жизни в почве и адаптации организмов к почвенным условиям.  1.1 Почва как специфическая среда обитания живых организмов.  1.2 Биологические процессы при почвообразовании.  Раздел 2. Основные систематические группы почвенных обитателей.  2.1 Разнообразие почвенных обитателей.  2.2 Простейшие и нематоды - их связь с почвой и роль в почвенных процессах  Раздел 3. Почвенная мезофауна.  3.1 Основные группы почвообитающих насекомых и их роль в почвенных процессах.  Раздел 4. Кольчатые черви, обитающие в почве, и их роль в почвообразовании.  4.1. Кольчатые черви, обитающие в почве, и их роль в почвообразовании.  Раздел 5. Питание почвенных обитателей и детритные трофические сети.  5.1 Трофические группы почвенных организмов.  5.2 Специфика питания различных групп почвенных животных.  5.3 Трофические и детритные сети.  5.4 Особенности детритных пищевых сетей в различных климатических условиях.  Раздел 6. Почвенные организмы в агроценозах.  6.1 Видовое разнообразие и специфика населения почвенных животных в агроценозах.  6.2 Влияние агротехнических мероприятий на почвенную фауну агроценозов.  Раздел 7. Особенности населения почв в городских условиях.  7.1 Городской климат и почвенные животные.  7.2 Значение педобионтов для функционирования городских экосистем.  7.3 Синантропные беспозвоночные и их адаптации к условиям, созданным человеком.  Раздел 8. Использование животных для повышения плодородия почв.  8.1 Почвенные организмы и плодородие почв.  8.2 Использование животных для мелиорации почв.  8.3 Интродукция почвенных животных.  8.4 Искусственное разведение почвенных беспозвоночных.  Раздел 9. Почвенные животные как биологические индикаторы окружающей среды.  9.1 Почвенные животные как биологические индикаторы.  9.2 Использование почвенных животных в радиоэкологических исследованиях.  9.3 Зональное распределение почвенной фауны.   Перед итоговой аттестацией проводится вебинар.   Раздел 10. Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3926');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (113, 'Основы мехатроники и робототехники
', 'online.edu.ru', '  Онлайн-курс состоит из десяти недель обучения.  Раздел 1Значение робототехники в автоматизации промышленного производства. Основные понятия и определения.  1.1Введение в курс. История автоматизации производства.  1.2Промышленный робот и манипулятор. Основные классы роботов.  1.3Классификация промышленных роботов.  1.4Особенности применения роботов. Гибкие производственные системы (ГПС).  Раздел 2Исполнительные устройства роботов.  2.1 Кинематика многозвенных манипуляторов. Рабочая зона манипуляторов. Задачи кинематического исследования.  2.2Конструкции манипуляторов промышленных роботов. Изучение структуры, кинематической схемы манипулятора робота «Робин РСС-1 Сфера».  2.3Изучение кинематических характеристик передаточных механизмов промышленного робота «Робин РСС-1 Сфера».  2.4Захватные устройства.  2.5Приводы промышленных роботов.  Раздел 3Кинематический анализ механизмов.  3.1Аналитическое определение положений, скоростей и ускорений звеньев манипулятора.  3.2Определение положений и скоростей звеньев манипулятора методом планов.  3.3Определение ускорений звеньев манипулятора методом планов.  Раздел 4Системы программного и адаптивного управления роботов.  4.1Общая структура системы управления промышленных роботов.  4.2Системы циклового, позиционного и контурного управления. Основные функции программного обеспечения.  4.3Адаптация и уровни адаптации. Программное обеспечение систем управления адаптивных роботов. Системы интеллектуального управления роботами.  Раздел 5Системы очувствления роботов.  5.1Информационно-сенсорные системы. Системы технического зрения и локационные системы. Изучение работы роботизированного сборочного стенда с техническим зрением.  5.2Тактильные и силомоментные системы очувствления.  5.3Общая функциональная схема системы управления роботизированного комплекса механической обработки на базе робота «Робин РСС-1 Сфера».  Раздел 6Автоматизированные системы контроля и диагностики РТК.     6.1Диагностирование состояния технологического оборудования и роботов в составе роботизированного технологического комплекса (РТК). Контроль состояния режущего инструмента.  6.2Контрольно-измерительные системы для обработки детали.  Раздел 7Дистанционно управляемые роботы и манипуляторы.  7.1Системы командного и копирующего управления манипуляторами. Полуавтоматические системы управления манипуляторами. Управляющие рукоятки.  7.2Дистанционные системы управления роботами.  Раздел 8Применение робототехнических систем.  8.1Применение промышленных роботов на основных технологических операциях. Сборочные робототехнические комплексы.  8.2Сварочные робототехнические комплексы.  8.3Робототехнические комплексы для нанесения покрытий.  8.4Применение промышленных роботов на вспомогательных технологических операциях. Роботизированные технологические комплексы механообработки.  8.5Роботизированные технологические комплексы штамповки.  8.6Роботизированные технологические комплексы специального назначения.  Раздел 9Автоматизированные технологии проектирования и подготовки производства: T-FLEX ЧПУ, T-FLEX.CAD, T-FLEX/ТЕХНО ПРО.  Заключение. Основные выводы и итоги курса.   Перед итоговой аттестацией проводится вебинар.   Раздел 10Итоговая аттестация.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3928');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (114, 'История и философия науки. Общие проблемы философии науки. Философия физико-математических наук
', 'online.edu.ru', '  Онлайн-курс состоит из десяти разделов:  Раздел 1. Предмет и основные концепции философии науки  1.1. Формирование философии науки и основные этапы ее развития (позитивизм и постпозитивизм)  1.2. Концептуальная модель современной философии науки  Раздел 2. Природа научного познания. Наука в системе культуры  2.1. Природа науки, три аспекта бытия науки  2.2. Образы науки и стандарты научности  2.3. Структура научного знания: эмпирический, теоретический уровни научного знания, уровень оснований науки  Раздел 3. Возникновение науки и основные стадии ее исторической эволюции  3.1. Генезис науки: наука античности, наука средневековья  3.2. Становление классической науки в эпоху Нового времени (формирование объекта, субъекта, метода научного познания)  3.3. Динамика науки в культуре европейской цивилизации. Внутренние и внешние факторы развития науки  Раздел 4. Динамика науки. Типы научной рациональности  4.1. Рост и развитие научного знания  4.2. Философия науки о динамике научной рациональности  4.3. Концепция постнеклассической науки, ее признаки  Раздел 5. Актуальные проблемы современной философии науки  5.1. Проблема объективности научного знания. Истина и достоверное знание  5.2. Научный реализм и релятивизация в научном познании  5.3. Междисциплинарные и трансдисциплинарные исследования в современной науке  Раздел 6. Предмет, специфика и функции физико-математических наук  6.1. Различие аналитического и синтетического, априорного и апостериорного в системе точного знания  6.2. Различие методов математики и естествознания в связи со спецификой их предметов. Аналитический подход к определению основных понятий  6.3. Кризисы в основаниях математики и теоретико-множественные парадоксы  6.4. Основные школы в философии и основаниях математики  Раздел 7. Математика как формальная система и проблемы вычислимости  7.1. Формалистская программа Гилберта  7.2. Ограничительные теоремы Гёделя и их математическое и философское значение  7.3. Проблема разрешимости и возможности вычислительной машины  Раздел 8. Проблемы искусственного интеллекта  8.1. Понятие искусственного интеллекта. Предпосылки возникновения систем искусственного интеллекта  8.2. Парадигма «интеллект как исчисление понятий». Парадигма «интеллект как восприятие». Парадигма «интеллект как рефлексия». Парадигма «интеллект как самоидентичность»  8.3. Тест Тьюринга. Понятие интенциональности, парадигма «интеллект как интенциональность». Аргумент «Китайская комната». Синтаксис и семантика систем искусственного интеллекта  Раздел 9. Физическая картина мира и её эволюция  9.1. Эволюция физической картины мира и изменение онтологии физического знания  9.2. Механическая, электромагнитная и современная квантово-релятивистская картины мира как этапы развития физического познания  9.3. Философские и общенаучные основания единства физического знания   Перед итоговой аттестацией проводится вебинар.   Раздел 10. Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3930');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (120, 'Психодиагностика
', 'online.edu.ru', '  Онлайн-курс состоит из десяти недель.  Раздел 1. Психодиагностика как наука.  1.1. Цели и задачи курса Психодиагностика  1.2. Исторические корни современной психодиагностики.  1.3. Предмет и особенности современной психодиагностики.  1.4. Сравнительная характеристика психологической диагностики и психологической оценки.  Раздел 2. Общая психодиагностика  2.1. Этические проблемы и дилеммы психодиагностики.  2.2. Современные международные стандарты работы психолога - психодиагноста.  2.3. Номотетический и идеографический подход в современной психодиагностике.  2.4. Классификация диагностических методик.  Раздел 3. Психометрика.  3.1. Структура и репрезентативность психологического теста.  3.2. Надежность.  3.3. Валидность.  3.4. Виды и типы диагностических шкал.  Раздел 4. Классическая психодиагностика интеллекта.  4.1. Диагностика элементарных способностей.  4.2. Традиционный подход в диагностике интеллекта.  4.3. Критериально-ориентированный подход в диагностике интеллекта.  Раздел 5. Современные подходы к диагностике интеллекта.  5.1. Структурный подход в диагностике интеллекта.  5.2. Диагностика эмоционального интеллекта.  5.3. Диагностика социального и этического интеллекта.  Раздел 6 . Классическая психодиагностика личности.  6.1. Способы сбора эмпирических данных о личностных особенностях.  6.2. Типологический подход в диагностике личности.  6.3. Диагностика акцентуаций.  6.4. Психодинамический подход в диагностике личности.  6.5. Структурно-блочный подход в диагностике личности.  Раздел 8. Диагностика потенциала человека.  8.1. Диагностика потенциала одаренности.  8.2. Диагностика личностного потенциала.  8.3. Диагностика профессионального потенциала.  Раздел 9. Интегративный подход в психодиагностике.  9.1. Интерактивный подход в диагностике.  9.2. Групповые техники психодиагностики.  9.3. Нарративный подход в диагностике личности.   Перед итоговой аттестацией проводится вебинар.   Раздел 10. Итоговая аттестация.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3942');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (115, 'География (Основы наук о Земле)
', 'online.edu.ru', '  Онлайн-курс состоит из девяти разделов:   Раздел 1. Источники географической информации   1.1. История развития географических знаний о Земле  1.2. Форма и размеры Земли  1.3. Осевое движение Земли и географические следствия  1.4. Орбитальное движение Земли и географические следствия  1.5. Виды изображения земной поверхности  1.6. Географическая карта   Раздел 2. Атмосфера Земли   2.1. Понятие об атмосфере  2.2. Нагревание атмосферы  2.3. Вода в атмосфере  2.4. Давление атмосферы  2.5. Воздушные массы и атмосферные фронты  2.6. Погода и климат   Раздел 3. Литосфера Земли   3.1. Внутреннее строение Земли. Геологическое летоисчисление  3.2. Состав и строение земной коры  3.3. Рельефообразующие внутренние процессы  3.4. Рельефообразующие внешние процессы  3.5. Рельеф суши  3.6. Рельеф дна Мирового океана   Раздел 4. Гидросфера и биосфера Земли. Географическая оболочка   4.1. Понятие о гидросфере. Круговорот воды в природе. Мировой океан: свойства вод  4.2. Движение вод в океане: волнения и морские течения  4.3. Воды суши: подземные воды, озёра, ледники  4.4. Воды суши: реки, болота  4.5. Биосфера  4.6.Понятие о географической оболочке. Свойства и закономерности   Раздел 5. Население мира   5.1. Численность населения мира и её динамика  5.2. Естественное движение населения  5.3.Поло-возрастная структура населения  5.4. Механическое движение населения  5.5. Этногеография  5.6. Размещение населения и географические формы расселения   Раздел 6. Экономическая география мира   6.1. Современная политическая карта мира. Основные типы стран  6.2. Ресурсный мировой потенциал.  6.3. География добывающих отраслей  6.4. География обрабатывающих отраслей  6.5. География сельского хозяйства  6.6. География мирового транспорта   Раздел 7. География России: природа   7.1. Географическое положение страны  7.2. Геологическое строение  7.3. Разнообразие рельефа  7.4. Климатические особенности  7.5. Богатство внутренних вод  7.6. Природные зоны   Раздел 8. География России: население   8.1. Численность и воспроизводство населения  8.2. Миграции населения  8.3. Половозрастная структура населения  8.4. Рынок труда и трудовые ресурсы  8.5. Национальный состав населения страны  8.6. Особенности расселения населения   Раздел 9. География России: экономическая и пространственная специфика   9.1. Топливная промышленность  9.2. Энергетика  9.3. Черная и цветная металлургия  9.4. Химическая промышленность  9.5. Сельское хозяйство  9.6. Внешнеэкономическая деятельность   Перед итоговой аттестацией проводится вебинар    Раздел 10.   Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3932');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (116, 'История и философия науки. Общие проблемы философии науки. Философия химии и наук о Земле
', 'online.edu.ru', '   Онлайн-курс состоит из десяти разделов:    Раздел 1. Предмет и основные концепции философии науки   1.1. Формирование философии науки и основные этапы ее развития (позитивизм и постпозитивизм)  1.2. Концептуальная модель современной философии науки   Раздел 2. Природа научного познания. Наука в системе культуры   2.1. Природа науки, три аспекта бытия науки  2.2. Образы науки и стандарты научности  2.3. Структура научного знания: эмпирический, теоретический уровни научного знания, уровень оснований науки   Раздел 3. Возникновение науки и основные стадии ее исторической эволюции   3.1. Генезис науки: наука античности, наука средневековья  3.2. Становление классической науки в эпоху Нового времени (формирование объекта, субъекта, метода научного познания)  3.3. Динамика науки в культуре европейской цивилизации. Внутренние и внешние факторы развития науки   Раздел 4. Динамика науки. Типы научной рациональности   4.1. Рост и развитие научного знания  4.2. Философия науки о динамике научной рациональности  4.3. Концепция постнеклассической науки, ее признаки   Раздел 5. Актуальные проблемы современной философии науки   5.1. Проблема объективности научного знания. Истина и достоверное знание  5.2. Научный реализм и релятивизация в научном познании  5.3. Междисциплинарные и трансдисциплинарные исследования в современной науке   Раздел 6. Философские аспекты естественно-научной картины мира   6.1. Историко-методологический анализ науки. Понятия «научная картина мира», «идеалы» и «нормы» научного исследования и др.  6.2. Особенности научного языка в химии и науках о Земле  6.3. Практическая природа химических знаний. Связь химии с технологией и промышленностью  6.4. Истоки и основания донаучных химических знаний  6.5. Вклад алхимии в научную химию   Раздел 7. Становление научной химии и ее философско-методологические проблемы   7.1. От ятрохимии к химической революции Лавуазье  7.2. Периодический закон химических элементов и его значение для науки  7.3. Химия XX в. Методы в химии  7.4. Нефтехимия  7.5. Перспективы развития химии в XXI в.   Раздел 8. Философские проблемы геологии   8.1. Науки о Земле как особый комплекс дисциплин  8.2. Место геологии в классификации наук. Предмет геологии – уникальный космический объект и сложная система планета Земля  8.3. Строение Земли и ее эволюция – методологические и теоретико-содержательные проблемы реконструкции  8.4. Геология и экология  8.5. Геохимическое учение В.И. Вернадского о биосфере и ноосфере   Раздел 9. Философские проблемы географии   9.1. Место географии в классификации наук и ее внутренняя структура  9.2. Философские основы географического способа объяснения мира  9.3. Проблема пространства и времени в науках о Земле  9.4. Картографическое моделирование  9.5. Синергетическая парадигма в науках о Земле   Раздел 10. Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3934');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (117, 'Психология одаренности, креативности и гениальности
', 'online.edu.ru', '  Онлайн-курс состоит из девяти разделов:  ГЕНИАЛЬНОСТЬ  Раздел 1. я ГЕНИЙ?  В данном разделе рассматривается феномен гениальности, что это такое, есть ли гениальность, какие существуют теории и ошибки в понимании феномена, риски проявления гениальности.  1.1. Сомнения в гениальности (я ГЕНИЙ?)  1.2. Заблуждения в представлениях о гениальности  1.3. Феноменология сомнений в гениальности  1.4. Метод достойных сомнений в гениальности  1.5. Риски сомнений в гениальности  Раздел 2. Я гений?  В данном разделе поднимаются вопросы идентичности гения и связанные с этим заблуждения, риски, примеры.  2.1. Сомнения в собственной гениальности (Я гений?)  2.2. Заблуждения в представлениях о собственной гениальности  2.3. Феноменология сомнений в собственной гениальности  2.4. Метод достойных сомнений в собственной гениальности  2. 5. Риски сомнений в собственной гениальности  Раздел 3. Я ГЕНИЙ!  В данном разделе раскрываются примеры переживания гениальности, примеры гениальной жизни, как жить гениально, с гением.  3.1. Уверенность в гениальности вообще и своей в частности (Я ГЕНИЙ!)  3.2. Заблуждения в представлениях об уверенности в гениальности  3.3. Феноменология уверенности в гениальности  3.4. Метод уверенности в гениальности  3.5. Риски уверенности в гениальности  ОДАРЕННОСТЬ  Раздел 4. я ОДАРЕННЫЙ?  В данном разделе рассматривается феномен одаренности, что это такое, какие существуют ошибки в понимании феномена, связанные с проявлением одаренности риски и проблемы.  4.1. Сомнения в одаренности (я ОДАРЕННЫЙ?)  4.2. Заблуждения в представлениях об одаренности  4. 3. Феноменология сомнений в одаренности  4.4. Метод достойных сомнений в одаренности  4.5. Риски сомнений в одаренности  Раздел 5. Я одаренный?  В данном разделе поднимаются вопросы идентичности одаренного человека – «Я одарённый», приводятся примеры переживаний и связанные с одарённостью риски.  5.1. Сомнения в собственной одаренности (Я одаренный?)  5.2. Заблуждения в представлениях о собственной одаренности  5.3. Феноменология сомнений в собственной одаренности  5.4. Метод достойных сомнений в собственной одаренности  5.5. Риски сомнений в собственной одаренности  Раздел 6. Я ОДАРЕННЫЙ!  Ключевая мысль раздела – «я одарен в той мере, в которой могу принимать, преумножать и отдавать», здесь рассматривается счастье творческого самовыражения.  6.1. Уверенность в одаренности вообще и своей в частности (Я ОДАРЕННЫЙ!)  6.2. Заблуждения в представлениях об уверенности в одаренности  6.3. Феноменология уверенности в одаренности  6.4. Метод уверенности в одаренности  6.5. Риски уверенности в одаренности  ПОСРЕДСТВЕННОСТЬ  Раздел 7. я ПОСРЕДСТВЕННОСТЬ?  В данном разделе рассматривается феномен посредственности и существующие ошибки здравого смысла в интерпретации.  7.1. Сомнения в посредственности (я ПОСРЕДСТВЕННОСТЬ?)  7.2. Заблуждения в представлениях о посредственности  7.3. Феноменология сомнений в посредственности  7.4. Метод достойных сомнений в посредственности  7.5. Риски сомнений в посредственности  Раздел 8. Я посредственность?  Ключевая мысль раздела – «Какими средствами я богат? Жизнь посредственная – это жизнь по мере, планирование по мере, в соответствии со средствами».  8.1. Сомнения в собственной посредственности (Я посредственность?)  8.2. Заблуждения в представлениях о собственной посредственности  8.3. Феноменология сомнений в собственной посредственности  8.4. Метод достойных сомнений в собственной посредственности  8.5. Риски сомнений в собственной посредственности  Раздел 9. Я ПОСРЕДСТВЕННОСТЬ!  Ключевая мысль раздела – «сказать «Я Посредственность» - это сказать «Я Мастер», мастер своего дела, эффективен и бережен».  9.1. Уверенность в посредственности вообще и своей в частности (Я ПОСРЕДСТВЕННОСТЬ!)  9.2. Заблуждения в представлениях об уверенности в посредственности  9.3. Феноменология уверенности в посредственности  9.4. Метод уверенности в посредственности  9.5. Риски уверенности в посредственности   Перед итоговой аттестацией проводится вебинар.   Раздел 10. Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3936');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (118, 'История и философия науки. Общие проблемы философии науки. Философия техники и технических наук
', 'online.edu.ru', '  Онлайн-курс состоит из десяти разделов:  Раздел 1. Предмет и основные концепции философии науки  1.1. Формирование философии науки и основные этапы ее развития (позитивизм и постпозитивизм)  1.2. Концептуальная модель современной философии науки  Раздел 2. Природа научного познания. Наука в системе культуры  2.1. Природа науки, три аспекта бытия науки  2.2. Образы науки и стандарты научности  2.3. Структура научного знания: эмпирический, теоретический уровни научного знания, уровень оснований науки  Раздел 3. Возникновение науки и основные стадии ее исторической эволюции  3.1. Генезис науки: наука античности, наука средневековья  3.2. Становление классической науки в эпоху Нового времени (формирование объекта, субъекта, метода научного познания)  3.3. Динамика науки в культуре европейской цивилизации. Внутренние и внешние факторы развития науки  Раздел 4. Динамика науки. Типы научной рациональности  4.1. Рост и развитие научного знания  4.2. Философия науки о динамике научной рациональности  4.3. Концепция постнеклассической науки, ее признаки  Раздел 5. Актуальные проблемы современной философии науки  5.1. Проблема объективности научного знания. Истина и достоверное знание  5.2. Научный реализм и релятивизация в научном познании  5.3. Междисциплинарные и трансдисциплинарные исследования в современной науке  Раздел 6. Техника как объект исследования. Понятие техносферы  6.1. Возникновение философии техники и обсуждаемые ею проблемы  6.2. Как определить технику?  6.3. Философы о технике  6.4. Человек и человеческая деятельность  6.5. Общество и техносфера  Раздел 7. Технические знания, этапы развития технических знаний  7.1. Техническое знание в доиндустриальный период  7.2. Техника и познание природы  7.3. Становление научного технического знания  7.4. Методология науки и техническое знание  Раздел 8. Технические науки, теория в технических науках  8.1. Абстрактные схемы в технической теории  8.2. Технические науки классического типа  8.3. Системное мышление и неклассические науки  8.4. Информационная революция, понятие информации  8.5. Компьютерная революция и постиндустриальная технологическая волна  Раздел 9. Социальная экспертиза и социальная ответственность в технике  9.1. Основные принципы структуралистского подхода  9.2. Социальная оценка техники  9.3. Этика и развитие техносферы  9.4. Проблема социальной ответственности в технике  9.5. Философия техники и технических наук: заключительная лекция   Перед итоговой аттестацией проводится вебинар.   Раздел 10. Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3938');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (119, 'Психология труда, инженерная психология и эргономика
', 'online.edu.ru', '  Онлайн-курс состоит из семи разделов:  Раздел 1. Отрасли науки, занимающиеся изучением трудовой деятельности.  1.1. История развития гуманитарных знаний о труде.  1.2. Формирование научных отраслей изучения трудовой деятельности в 20 веке.  1.3. Инженерная психология и HCI как науки.  1.4. Эргономика как наука.  1.5. Психология труда как наука.  Раздел 2. Психофизиологические характеристики трудовой деятельности.  2.1. Работоспособность.  2.2. Утомление.  2.3. Режим труда и отдыха.  2.4. Напряжённость трудовой деятельности  2.5. Функциональные состояния работника.  Раздел 3. Психологические характеристики трудовой деятельности.  3.1. Труд как предмет гуманитарных исследований.  3.2. Профессиональная пригодность и трудоспособный возраст.  3.3. Основные формы занятости современного работника.  3.4. Понятие профессии.  3.5. Способы описания профессий.  Раздел 4. Мотивация трудовой деятельности.  4.1. Ранние научные теории мотивации к труду.  4.2. Социально-психологический подход к мотивации трудовой деятельности.  4.3. Содержательные теории мотивации.  4.4. Процессуальные теории мотивации.  Раздел 5. Психология профессионализма.  5.1. Ценностный подход к пониманию профессионализма.  5.2. Этапы профессионализации.  5.3. Компетентностный подход к профессионализму.  5.4. Виды профессиональных компетенций.  Раздел 6. Профессиональные дефициты современного работника.  6.1. Профессиональные кризисы.  6.2. Возможности управления профессиональным кризисом.  6.3. Профессиональные деструкции.  6.4. Профилактика профессиональных деструкций.  Раздел 7. Современные подходы к построению карьеры.  7.1. Понятие самоопределения и его базовые характеристики.  7.2. Интегративные концепции самоопределения.  7.3. Профессиональное самоопределение.  7.4. Профессиональная перспектива.  7.5. Современные подходы к пониманию карьеры.  Раздел 8. Управление карьерой и профессиональная ориентация.  8.1. Понятие профессиональной ориентации.  8.2. Профессиональное просвещение и пропаганда и профессиональное обучение.  8.3. Профессиональный отбор и профессиональный подбор.  8.4. Профессиональная адаптация и профессиональная реабилитация.  Раздел 9. Технологии психологического сопровождения современного специалиста.  9.1. Этические проблемы психологического сопровождения современного специалиста.  9.2. Профессиональная консультация.  9.3. Групповая консультация и тренинг для специалистов.   Перед итоговой аттестацией проводится вебинар.   Раздел 10. Итоговая аттестация.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3940');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (121, 'История и философия науки. Общие проблемы философии науки. Философия наук о живой природе
', 'online.edu.ru', '  Онлайн-курс состоит из десяти разделов:  Раздел 1. Предмет и основные концепции философии науки  1.1. Формирование философии науки и основные этапы ее развития (позитивизм и постпозитивизм)  1.2. Концептуальная модель современной философии науки  Раздел 2. Природа научного познания. Наука в системе культуры  2.1. Природа науки, три аспекта бытия науки  2.2. Образы науки и стандарты научности  2.3. Структура научного знания: эмпирический, теоретический уровни научного знания, уровень оснований науки  Раздел 3. Возникновение науки и основные стадии ее исторической эволюции  3.1. Генезис науки: наука античности, наука средневековья  3.2. Становление классической науки в эпоху Нового времени (формирование объекта, субъекта, метода научного познания)  3.3. Динамика науки в культуре европейской цивилизации. Внутренние и внешние факторы развития науки  Раздел 4. Динамика науки. Типы научной рациональности  4.1. Рост и развитие научного знания  4.2. Философия науки о динамике научной рациональности  4.3. Концепция постнеклассической науки, ее признаки  Раздел 5. Актуальные проблемы современной философии науки  5.1. Проблема объективности научного знания. Истина и достоверное знание  5.2. Научный реализм и релятивизация в научном познании  5.3. Междисциплинарные и трансдисциплинарные исследования в современной науке  Раздел 6. Что такое жизнь? Биология как основа наук о жизни  6.1. Понятие «жизнь» как предмет изучения науки и философии  6.2. Предмет философии биологии и его эволюция. Историческое развитие представлений о сущности жизни  6.3. Теория эволюции: от Дарвина до современности  6.4. Генетика и ее основные концепты  6.5. Фундаментальные проблемы философии биологии: на пути к общей теории жизни  Раздел 7. Биологическое и социальное: человек в зеркале наук о жизни  7.1. Биология и социальная жизнь: концептуальные основания учения о природе и сущности человека  7.2. Философские проблемы антропосоциогенеза в контексте наук о жизни  7.3. Философские проблемы этологии: сравнительное изучение видов активности животных и человека  7.4. Философские проблемы социобиологии  7.5. Когнитивные науки о человеке: мозг и сознание  Раздел 8. Экология и экофилософия  8.1. Экология как междисциплинарное поле исследований и практик  8.2. История развития экологических концепций  8.3. Философские проблемы экологии  8.4. Экофилософия и экологическое сознание  Раздел 9. Философские проблемы медицины. Биоэтика и биополитика  9.1. Философия медицины, ее предмет, цели, задачи и основная проблематика  9.2. История медицины  9.3. Актуальное состояние медицины и ее важнейшие философские проблемы  9.4. Биоэтика и медицинская этика  9.5. Биополитика   Перед итоговой аттестацией проводится вебинар   Раздел 10. Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3945');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (122, 'Параллельное программирование с использованием OpenMP и MPI
', 'online.edu.ru', '  Онлайн-курс состоит из девяти разделов:  Раздел 1. Введение в параллельный мир  1.1. История развития параллелизма в архитектуре ЭВМ  1.2. Иерархическая организация памяти в компьютере  1.3. Основные архитектуры многопроцессорных вычислительных систем. Их классификация  1.4. Обзор задач, требующих использования СуперЭВМ  1.5. Инструменты создания параллельных программ  Раздел 2. Основы OpenMP  2.1. Особенности программирования для систем с общей памятью. Понятие процесса, потока и многопоточности  2.2. Технология OpenMP, особенности и ее компоненты  2.3. Задание параллельной области и опции, влияющие на ее выполнение  2.4. Модель памяти. Классы переменных в OpenMP  2.5. Режимы выполнения многопоточных программ. Вложенный параллелизм  Раздел 3. Директивы распределения работы и синхронизации работы  3.1. Распараллеливание выполнения циклов  3.2. Распределение нескольких структурных блоков между потоками  3.3. Распределение работы на основе независимых задач  3.4. Синхронизация выполнения различных потоков. Простые директивы  3.5. Синхронизация выполнения различных потоков. Замки  Раздел 4. Векторные вычисления с помощью OpenMP0  4.1. Что такое векторизация и зачем она нужна  4.2. Векторизация исполняемого кода для современных процессоров  4.3. Новые возможности в стандарте OpenMP 4.0  4.4. Примеры использования векторизации  Раздел 5. Анализ и оптимизация программ с использованием современных программных пакетов  5.1. Основные опции компилятора Intel. Автоматическое распараллеливание  5.2. Основные возможности Intel Parallel Studio  5.3. Поиск ошибок работы с памятью с использованием Intel® Parallel Inspector  5.4. Профилирование программ с использованием Intel® Parallel Amplifier  Раздел 6. Системы с распределённой памятью. Основы MPI  6.1. Основные понятия модели передачи сообщений, MPI среди других средств разработки параллельных программ  6.2. Основные понятия и определения, состав MPI. Синтаксис функций MPI  6.3. Первая параллельная программа с использованием MPI  6.4. Ускорение работы параллельной программы  6.5. О построении параллельных алгоритмов  Раздел 7. Прием и передача сообщений между отдельными процессами  7.1. Обзор двухточечных обменов сообщениями  7.2. Блокирующие обмены  7.3. Неблокирующие обмены  7.4. Параллельные алгоритмы суммирования  7.5. Примеры параллельных программ, демонстрирующие использование функций MPI, изученных в разделе 7  Раздел 8. Коллективные операции  8.1. Обзор коллективных операций. Широковещательная рассылка  8.2. Функции сбора данных со всех процессов  8.3. Функции распределения данных по всем процессам  8.4. Функции редукции  8.5. Примеры параллельных программ, демонстрирующие использование функций MPI, изученных в разделе 8  Раздел 9. Производные типы данных. Группы и коммуникаторы  9.1. Создание и использование производных типов данных  9.2. Создание групп и коммуникаторов  9.3. Виртуальные топологии. Декартова топология. Организация пересылок данных в декартовой топологии  9.4. Виртуальные топологии. Топология графа  9.5. Примеры параллельных программ, демонстрирующие использование функций MPI, изученных в разделе 9  Раздел 10. Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3947');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (123, 'Социальные медиа
', 'online.edu.ru', '  Онлайн-курс состоит из следующих разделов.  Раздел 1. Техноэволюция социальных платформ: от «электронных шкафов» (мэйнфреймов) к коллективному разуму социальных медиа.  1.1. Artificial Intelligence. Эволюция машинного разума: от «электронных шкафов» (мэйнфреймов) к персональному компьютеру (PC).  1.2. Краткая история Всемирной паутины.  Раздел 2. Web 2.0. Новые пользователи и новые виртуальные активности.  2.1. Пользовательский контент как особенность Web 2.0.  2.2. Викиномика и N-Geners (просьюмеры): краудсорсинг как принцип сотрудничества в Сети.  2.3. Френдинг в Сети: функция поддержки слабых социальных связей.  Раздел 3. Виртуальная самопрезентация и сетевой этикет (нетикет).  3.1. Виртуальная идентичность и самопрезентация в сети.  3.2. Лексика, семантика и этика сетевого общения.  Раздел 4. Типология социальных платформ и особенности организации коммуникаций.  4.1. Коллективные и персональные блоги и микроблоги (LiveJournal (Живой Журнал) и Twitter).  4.2. Многопользовательские популярные социальные сети (Facebook, ВКонтакте, Одноклассники, LinkedIn, Мой Мир).  4.3. Популярные фото- и видеохостинги (Instagram, Flickr, Picasa, YouTube, Rutube).  4.4. Многопользовательские сетевые игры (Massively Multiplayer Online Games) и игры в альтернативной реальности (Alternate Reality Games).  Раздел 5. Блогинг как новый инструмент репутационного менеджмента.  5.1. Краткая история становления блогинга.  5.2. Блогеры как создатели versus: разрушители репутации компаний.  5.3. Особенности blogger relations для пиар-специалиста.  5.4. Ведение блога: простые рецепты копирайтинга и раскрутки.  5.5. Корпоративный блог: копирайтинг и продвижение.  Раздел 6. Принципы и формы организации SMM (Social Media Marketing) и рекламы.  6.1. Social Media Marketing: задачи, основные принципы, стратегии и алгоритм действий.  6.2. Маркетинговые характеристики и особенности основных бренд-платформ: Одноклассники, ВКонтакте, Facebookи Twitter.  6.3. Поддержка activity: работа с адвокатами бренда и функции контент- и комьюнити-менеджеров.  6.4. Реклама в социальных сетях: от «стрельбы по площадям» к гипертаргетированию.  6.5. Ручной и автоматический мониторинг упоминаний бренда в социальных сетях. Русскоязычные сервисы мониторинга.  Раздел 7. Организация специальных событий через социальные сети.  7.1. Как организовать специальное событие с использованием социальной платформы.  7.2. «Чей фант выиграл» или организация виртуальных конкурсов в сети.  Раздел 8.Бизнес-сети, хедхантинг и поиск работы в социальных сетях.  8.1. Сети в бизнесе и бизнес в сети: профессиональные платформы LinkedIn, Профессионалы.ру, Rb.ru,Doostang.  8.2. HR в сетях: репутация работника и рекрутера. Основные этапы: установление доверия к рекрутеру, поддержание контакта, поддержание в открытом виде коммуникаций с неустроенными кандидатами.  8.3. Советы кандидатам по поиску работы в социальных сетях.  Раздел 9. Социальные сервисы электронного образования.  9.1. «Фабрики» образовательного контента: массовые онлайн-курсы как образовательный тренд.  9.2. Коллаборативные сервисы Web 2.0 на службе образования.  9.3. Тренды в образовании для «цифровых аборигенов»: мобильное обучение и геймификация.  9.4. Особенности преподавательской самопрезентации в Сети.  9.5. Как представить университет в Сети: кейс-стади продвижения НИ ТГУ в социальных сетях.  9.6. Заключение: основные выводы и итоги курса. Утопия общества социальных сетей.   Перед итоговой аттестацией проводится вебинар.   Раздел 10. Итоговая аттестация.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3949');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (124, 'История и философия науки. Общие проблемы философии науки. Философия социально-гуманитарных наук
', 'online.edu.ru', '   Онлайн-курс состоит из десяти разделов:    Раздел 1. Предмет и основные концепции философии науки   1.1. Формирование философии науки и основные этапы ее развития (позитивизм и постпозитивизм)  1.2. Концептуальная модель современной философии науки   Раздел 2. Природа научного познания. Наука в системе культуры   2.1. Природа науки, три аспекта бытия науки  2.2. Образы науки и стандарты научности  2.3. Структура научного знания: эмпирический, теоретический уровни научного знания, уровень оснований науки   Раздел 3. Возникновение науки и основные стадии ее исторической эволюции   3.1. Генезис науки: наука античности, наука средневековья  3.2. Становление классической науки в эпоху Нового времени (формирование объекта, субъекта, метода научного познания)  3.3. Динамика науки в культуре европейской цивилизации. Внутренние и внешние факторы развития науки   Раздел 4. Динамика науки. Типы научной рациональности   4.1. Рост и развитие научного знания  4.2. Философия науки о динамике научной рациональности  4.3. Концепция постнеклассической науки, ее признаки   Раздел 5. Актуальные проблемы современной философии науки   5.1. Проблема объективности научного знания. Истина и достоверное знание  5.2. Научный реализм и релятивизация в научном познании  5.3. Междисциплинарные и трансдисциплинарные исследования в современной науке   Раздел 6. Предмет, специфика и функции социально-гуманитарных наук   6.1. Возникновение и основные вехи развития социально-гуманитарных наук  6.2. Предмет социально-гуманитарного знания в горизонте смены типов рациональности  6.3. Категориальная обеспеченность социально-гуманитарного знания: как мы можем осваивать социальный мир  6.4. Методология социально-гуманитарного знания: как мы можем осваивать социальный мир  6.5. Основные методологические стратегии   Раздел 7. Герменевтика: проблема понимания в дискурсе социально-гуманитарных наук   7.1. Что значит понимать  7.2. Введение в историю герменевтики  7.3. Становление герменевтики: от практики и методологии истолкования текстов к философии понимания  7.4. Герменевтический поворот М. Хайдеггера и Х.-Г. Гадамера: бытие человека изначально герменевтично  7.5. Современные перспективы герменевтики   Раздел 8. Современная социально-критическая теория: общество, его друзья и враги   8.1. Апология общества. Рождение критики  8.2. Основные идеи критической теории Франкфуртской школы  8.3. Основные идеи критической теории Франкфуртской школы. Одномерное общество  8.4. Общество как пространство социального конструирования  8.5. Власть как центральная проблема социально гуманитарных наук   Раздел 9. Структурализм и постмодернизм   9.1. Основные принципы структуралистского подхода  9.2. Расскажи мне историю. Ключевые идеи нарратологии  9.3. Постмодернизм: недоверие к великим рассказам  9.4. Что такое деконструкция  9.5. Концепция дискурса Мишеля Фуко   Раздел 10. Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3952');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (125, 'Теория вероятностей
', 'online.edu.ru', '  Онлайн-курс состоит из следующих разделов:   Раздел 1. Вероятностное пространство и свойства вероятности   1.1. Выборочное пространство. Примеры  1.2. Случайные события. Операции над событиями  1.3. Операции над событиями. Формулы двойственности  1.4. Вероятность. Аксиоматическое определение  1.5. Частотная интерпретация вероятностей  1.6. Задание вероятностей  1.7 Свойства вероятностей  1.8. Задача о рассеянной секретарше  1.9 Тест1   Раздел 2. Вероятность: частные случаи. Элементы комбинаторики   2.1. Комбинаторика. Основные правила. Размещения  2.2. Комбинаторика. Сочетания. Треугольник Паскаля  2.3. Комбинаторика. Выбор с возвращением. Таблица  2.4. Классическое определение вероятностей  2.5. Геометрическое определение вероятностей  2.6 Тест2   Раздел 3. Условная вероятность и независимость   3.1. Понятие условной вероятности  3.2. Формула умножения вероятностей  3.3. Дерево вероятностей  3.4. Формула полной вероятности  3.5. Формула Байеса  3.6. Формула Байеса. Примеры применения  3.7. Независимость событий  3.8 Тест3   Раздел 4. Дискретные случайные величины   4.1. Схема испытаний Бернулли  4.2. Понятие дискретного распределения. Примеры  4.3. Биномиальное и пуассоновское распределения  4.4. Многомерное дискретное распределение. Условные распределения  4.5. Среднее значение, моменты случайной величины. Формула полного среднего  4.6. Дисперсия. Ковариация, корреляция и независимость случайных величин   Раздел 5. Дополнительный материал   5.1 Среднее и дисперсия числа совпадений в задаче о рассеянной секретарше  5.2 Распределение Паскаля  5.3 Среднее и дисперсия суммы случайного числа независимых одинаково  распределенных случайных величин  5.4 Тест4   Раздел 6. Непрерывные случайные величины vs дискретные случайные величины   6.1 Вероятностное пространство. Борелевская сигма-алгебра  6.2 Функция распределения вероятностей случайной величины  6.3 Функция плотности вероятностей случайной величины  6.4 Сравнение дискретных и непрерывных случайных величин  6.5 Квантили распределения  6.6 Экспоненциальное распределение  6.7 Процесс Бернулли  6.8 Процесс Пуассона   Раздел 7. Примеры решения задач по теме «Непрерывные случайные величины vs дискретные случайные величины»   7.1. Монотонное преобразование непрерывных случайных величин. Линейное преобразование  7.2 Монотонное преобразование непрерывных случайных величин. Общий случай  7.3 Монотонное преобразование непрерывных случайных величин. Интересный пример  7.4 Нахождение функции распределения непрерывной случайно величины по заданной функции плотности  7.5 Смешанные (дискретно-непрерывные) случайные величины  7.6 Объединенный процесс Бернулли  7.7 Парадокс среднего времени ожидания (пуассоновский процесс)  7.8 Тест5   Раздел 8. Совместные непрерывные распределения   8.1 Многомерные непрерывные распределения. Независимость  8.2 Условные непрерывные распределения. Часть 1  8.3 Условные непрерывные распределения. Часть 2  8.4 Условное среднее. Формула полного среднего  8.5 Задача о двух точках на отрезке  8.6 Задача о среднем времени, проведенном в автосервисе Exponenta  8.7 Задача на формулу Байеса (непрерывный случай)   Раздел 9. Примеры решения задач по теме «Совместные непрерывные распределения»   9.1 Формула Байеса в случае, когда одна случайная величина – непрерывная, а другая – дискретная  9.2 Формула Байеса: наблюдаем дискретную случайную величину, находим апостериорное распределение непрерывной случайной величины  9.3 Формула Байеса: наблюдаем непрерывную случайную величину, находим апостериорное распределение дискретной случайной величины  9.4 Задача об опаздывающем преподавателе  9.5 Задача о монете    Раздел 10. Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3954');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (126, 'Информатика для втузов
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Введение в информатику. Основы теории информации. 2. Системы счисления. Особенности округления чисел. 3. Представление чисел в ЭВМ. Арифметика в ограниченной разрядной сетке. 4. Основы сжатия информации. Основы помехоустойчивого кодирования. 5. Основы дискретной математики для ЭВМ. 6. Структура и принципы функционирования ЭВМ. Организация хранения данных в ЭВМ. 7. Передача данных в компьютерных сетях. 8. Офисное программное обеспечение. 9. Вспомогательное программное обеспечение для программирования. Вебинары. Лицензии в сфере программных продуктов. 10. Система вёрстки TeX.  Каждая тема изучается в течение одной недели.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3956');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (127, 'Электрические машины
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Катушка с магнитопроводом в цепи переменного тока.  Преобразование энергии трансформатором.  Специальные типы трансформаторов и их применение в технике.  Магнитные поля бесколлекторных машин.  Конструкция, принцип действия и характеристики асинхронного двигателя.  Управление асинхронным двигателем. Специальные типы двигателей.  Конструкция принцип действия и характеристики синхронных машин.  Синхронные двигатели.  Двигатели постоянного тока.  Управление двигателем постоянного тока. Специальные типы коллекторных машин и вентильные двигатели.   Каждая тема предполагает изучение в течение одной недели. На 6-й и 12-й неделях запланированы упражнения по пройденному материалу.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3958');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (128, 'Компьютерная инженерная графика. Часть 1
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Начало работы в AutoCAD Установка Autocad 2018. Пользовательский интерфейс. Перемещение по чертежу. Способы выделения объектов. Выбор объектов. Удаление объектов. Создание и сохранение файлов чертежа. Параметры интерфейса. Команда «Отрезок». Завершение и прерывание команд. Черчение по координатам. Декартова система координат. Единицы измерения. Динамический ввод. Ортогональный режим. Полярное отслеживание. Объектная привязка. Режим «Объектная привязка». Разовые привязки. Параметры режима «Объектная привязка» 2. Начальные команды черчения и редактирования. Команда «Обрезать». Команда «Удлинить». Команда «Увеличить». Команда «Подобие». Черчение окружностей. Черчение дуг. Черчение элипсов и элиптических дуг. 3. Трансформация объектов. Команда «Перенести». Команда «Копировать». Команда «Повернуть». Команда «Масштаб». Команда «Зеркало». Последовательность выбора объектов. 4. Объектное отслеживание. Инструменты создания и редактирования объектов. Параметры режима «Объектное отслеживание». Привязка «Точка отслеживания». Команда «Растянуть». Команда «Прямоугольный массив». Команда «Круговой массив». Команда «Массив по траектории». Команда «Редактировать массив». Команда «Расчленить». Команда «Сопряжение». Команда «Фаска». Работа с ручками 5. Слои и свойства объектов. Свойства объектов. Основные свойства объектов. Дополнительные и геометрические свойства объектов. Слои. Создание, наименование и удаление слоев. Текущий слой и перемещение объектов по слоям. Оформление объектов слоя. Управление видимостью слоев. Дополнительные команды управления слоями. Копирование свойств. Порядок прорисовки. Управление видимостью объектов. Изолирование и скрытие объектов. Маскировка. 6. Создание и редактирование текста Создание однострочного текста. Редактирование однострочного текста. Создание многострочного текста. Текстовые стили. Создание стилей. Применение текстового стиля 7. Размеры Команды создания размеров. Инструменты управления размерами. Мультивыноска. Инструменты мультивыноски. Стили мультивыноски. Размерные стили 8. Сложносоставные объекты. Изометрический режим. Полилинии. Команда «Прямоугольник». Команда «Многоугольник». Команда «Контур». Команда «Область». Сплайны. Штриховка и градиент. Команда «Штриховка». Команда «Градиент». Прямоугольные и изометрические режимы. Режим «Сетка». Лимиты чертежа. Режим «Шаг». Изометрический режим 9. Группы, блоки и внешние ссылки. Дополнительные команды рисования и редактирования Группы. Блоки. Работа с внешними файлами. Внешние ссылки на файлы DWG. Палитра «Внешние ссылки». Растровые изображения. Файлы подложек. Вставка объектов. Дополнительные команды рисования и редактирования. Команда «Луч». Команда «Прямая». Создание пометочных облаков. Команды редактирования. Команда «Удалить повторяющиеся объекты». Команда «Разорвать». Команда «Разорвать в точке». Команда «Соединить». Команда «Обратить». Команда «Соединение кривых». Команда «Выровнять» 10. Печать Печать из модели. Именованные наборы параметров листов. Вкладки «Лист». Управление листами. Операции с листами «Листов». Видовые экраны. Создание видовых экранов. Установка масштаба видового экрана. Редактирование видового экрана. Переопределение свойств слоев.  Каждая тема изучается в течение одной недели.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3960');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (129, 'Компьютерная инженерная графика. Часть 2
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   1. Адаптация пользовательского интерфейса   Диалоговое окно «Адаптация пользовательского интерфейса». Адаптация вкладок ленты. Адаптация панелей ленты. Адаптация панели инструментов. Адаптация палитры быстрых свойств. Настройка подсказок для ролловеров. Создание контекстных меню. Инструментальные палитры.   2. Работа с таблицами   Вставка таблиц. Редактирование таблиц. Связывание таблицы с внешними данными.   3. Извлечение данных    Извлечение данных с помощью «Мастер извлечения данных». Редактирование извлеченных данных. Объединение таблиц.   4. Редактирование и извлечение атрибутов. Мультилиния   Определение атрибута блока. Вставка блока с атрибутами в рисунок. Изменение определений атрибутов блока. Редактирование атрибутов. Создание и редактирование мультилинии. Стили мультилиний.   5. Динамические блоки   Добавление параметров и операций в динамические блоки. Настройка внешнего вида операций и параметров. Настройка видимости объекта. Настройка операций. Параметризация.   6. Создание типов линий и шаблонов штриховки   Создание типов линий. Создание шаблонов штриховки.   7. Утилиты и сервис. Аннатотивные объекты и стили печати.   Утилиты работы с файлами. Очистка рисунка от неиспользуемых именованных объектов. Установка режимов безопасности. Создание комплекта отправки чертежей. Установка свойств рисунка. Использование встроенного калькулятора. Получение информации из чертежа. Информация об объектах чертежа. Определение площади и периметра плоских объектов.   8. Совместная работа   Диспетчер подшивок. Создание подшивки. Организация подшивки. Использование групп листов. Создание и изменение листов. Публикация и печать. Сервис A360.   9. Основы оформления чертежей. Часть 1.   Государственные стандарты. Общие требования к чертежам. Форматы. Масштабы. Линии. Основные надписи. Шрифты. Изображение предметов на чертеже. Графическое обозначение материалов на чертеже. Изображение резьбы на чертеже   10. Основы оформления чертежей. Часть 2.   Нанесение размеров и предельных отклонений. Допуски форм и расположения поверхностей. Нанесение технических требований и таблиц на чертежах.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий):  – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения;  – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3962');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (130, 'Основы менеджмента
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  Тема 1. Новаторский менеджмент и информационная революция  Понятие менеджмента. Менеджмент – наука и искусство. Функции менеджмента.  Тема 2. Влияние внешней и внутренней среды на менеджмент  Среда менеджмента. Организационная культура. Этика и ответственность менеджмента.  Тема 3. Формирование эффективных коммуникаций  в организациях будущего Основы организаций. Коммуникации в организациях. Построение коммуникаций в организациях  Тема 4. Организационные конфигурации  Организационные компоненты и механизмы координации. Создание, функционирование и развитие организаций.  Тема 5. Организационные изменения  Понятие организационных изменений. Сопротивление изменениям. Управление процессами изменений в организациях.  Тема 6. Стратегии и планирование в организациях  Постановка целей в организации. Формирование и осуществление стратегии. Планирование в организациях.  Тема 7. Управленческие решения в организации  Процесс принятия управленческих решений. Модели принятия решений. Методы принятия решений.  Тема 8. Мотивация исполнения управленческих решений  Концепция мотивации. Содержательные теории мотивации. Процессные теории мотивации.  Тема 9. Лидерство в организациях  Лидерство: власть и влияние. Стили лидерства. Лидерство и руководство.  Тема 10. Командная работа в организации  Особенности групповой и командной работы. Типология команд. Внутренние процессы командной работы.  Тема 11. Конфликты в организациях.  Природа и содержание конфликта. Виды организационных конфликтов. Руководитель в конфликтной ситуации. Разрешение конфликта.  Тема 12. Управленческий контроль в организациях  Подходы к организации контроля. Действия менеджмента по результатам контроля. Информационные системы контроля.  Каждая тема изучается в течение одной недели.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3966');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (131, 'Геометрическая оптика
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   1. Световые поля и волны 2. Энергетические и световые величины 3. Законы геометрической оптики 4. Параксиальная оптика 5. Типы и характеристики оптических систем 6. Матричная оптика 7. Реальные оптические системы 8. Ограничения пучков лучей в оптических системах 9. Оптические элементы  Каждая тема предполагает изучение в течение одной недели. На 10-й неделе запланирован итоговый интернет-экзамен.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3969');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (132, 'Инновационная экономика и технологическое предпринимательство
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Введение в инновационное развитие  Формирование и развитие команды  Бизнес–идея, бизнес-модель, бизнес-план  Маркетинг. Оценка рынка.  Product development. Разработка продукта.  Customer development. Выведение продукта на рынок.  Нематериальные активы и охрана интеллектуальной собственности  Трансфер технологий и лицензирование  Создание и развитие стартапа  Коммерческий НИОКР  Инструменты привлечения финансирования  Оценка инвестиционной привлекательности проекта  Риски проекта  Презентация проекта  Инновационная экосистема  Государственная инновационная политика  Итоговая презентация группового проекта (питч-сессия)   В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий):   мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения;  жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3971');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (133, 'Правовые основы интеллектуальной собственности
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Раздел 1. Организационные и правовые аспекты интеллектуальной собственности в РФ  1.1 Основные понятия в области интеллектуальной собственности 1.2 Охрана интеллектуальной собственности авторским правом 1.3 Охрана изобретений и полезных моделей в РФ 1.4 Охрана промышленных образцов в РФ 1.5 Правовая охрана программ ЭВМ (электронно-вычислительные машины), БД (базы данных), топологий ИМС (интегральной микросхемы) как объектов авторского права 1.6 Охрана средств индивидуализации в РФ 1.7 Правовая охрана нетрадиционных объектов интеллектуальной собственности 1.8 Служебная интеллектуальная собственность 1.9 Патентная информация и документация  Раздел 2. Международная система интеллектуальной собственности  2.1 Элементы международной системы интеллектуальной собственности 2.2 Обеспечение правовой охраны промышленной собственности за рубежом  Раздел 3. Экономика и управление интеллектуальной собственностью  3.1 Распоряжение правами на интеллектуальную собственность 3.2 Управление, оценка и бухгалтерский учет интеллектуальной собственности  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3973');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (134, 'Основы взаимозаменяемости
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Понятие о взаимозаменяемости, размерах допусках и посадках  Структура Единой системы допусков и посадок  Размерные цепи. Основы.  Размерные цепи. Примеры расчетов цепей  Стандартизация типовых соединений гладких элементов деталей  Точность формы и расположения поверхностей  Шероховатость и волнистость поверхностей. Допуски расположения осей отверстий для крепежных деталей  Технические измерения  Взаимозаменяемость резьбовых соединений  Взаимозаменяемость, методы и средства измерения зубчатых колес и передач   В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий):  – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения;  – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3975');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (137, 'Линейные электрические цепи
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Электрическая цепь. Элементы электрической цепи 2. Законы Ома и Кирхгофа. Эквивалентные преобразования 3. Синусоидальные ЭДС, токи и напряжения. Параметры электрических цепей 4. Закон Ома. Пассивный двухполюсник 5. Разветвленные цепи. Магнитная связь в электрических цепях 6. Явление резонанса 7. Трёхфазные цепи и цепи несинусоидального тока 8. Переходные процессы  Каждая тема предполагает изучение в течение одной недели. На 5-й и 10-й неделях запланированы упражнения по пройденному материалу.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3981');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (138, 'Модели и методы аналитической механики
', 'online.edu.ru', '  В курсе рассматриваются следующие темы: 1. Введение 2. Мощность, работа, кинетическая и потенциальная энергии механической системы 3. Фазовые координаты и обобщенные силы 4. Матрица инерции механической системы с одной и несколькими степенями свободы 5. Уравнения Лагранжа и уравнения Гамильтона 6. Матричные формы динамических уравнений линейных и нелинейных систем 7. Динамика манипуляционных роботов 8. Линейные колебания механических систем 9. Математические модели нелинейных колебаний 10. Автоколебания нелинейных систем  Каждая тема предполагает изучение в течение одной недели. В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3983');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (139, 'Алгоритмы программирования и структуры данных
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Оценка времени работы алгоритмов  Алгоритмы сортировки, основанные на сравнении (сортировка слиянием, быстрая сортировка, нижняя оценка на время работы алгоритмов сортировки)  Алгоритмы сортировки с линейным временем выполнения (сортировка подсчетом, цифровая сортировка, карманная сортировка)  Элементарные структуры данных (стек, очередь, связанные списки)  Алгоритмы, основанные на двоичной куче (сортировка кучей, очередь с приоритетами)  Введение в алгоритмы поиска (двоичный поиск в отсортированном массиве, двоичное дерево поиска)  Сбалансированные деревья поиска (обзор сбалансированных деревьев, АВЛ-дерево, Splay-дерево)  Хеширование (хеш-таблицы с закрытой и открытой адресацией)  Введение в поиск подстрок (простейший алгоритм поиска подстрок, алгоритм Рабина-Карпа)  Поиск подстрок (алгоритм Кнута-Морриса-Пратта, Z-функция, алгоритм Бойера-Мура)   Каждая тема предполагает изучение в течение одной недели. На каждой неделе выдаются задания по программированию, предполагающие самостоятельную реализацию изучаемых в курсе алгоритмов и структур данных.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3987');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (149, 'Основы экономической эффективности производства
', 'online.edu.ru', '  Раздел 1. Экономическая модель промышленного предприятия   Ключевые заинтересованные лица (стейкхолдеры) предприятия, экономический механизм деятельности  Влияние руководителей и технических специалистов на достижение целей предприятия (подразделений)  Ресурсы предприятия, их движение и источники финансирования  Показатели объема продукции, производственная мощность   Раздел 2. Резервы эффективного использования ресурсов производства   Основные средства: состав, показатели и резервы повышения эффективности использования, диагностика и оценка потерь, отражение в себестоимости продукции  Оборотный капитал: состав, показатели и резервы повышения эффективности использования, оценка потребности в ресурсах, резервы роста оборачиваемости, отражение в себестоимости продукции  Кадры: состав, ключевые инструменты организации, нормирования и оплаты труда, резервы роста производительности труда   Раздел 3. Экономические результаты производственной деятельности   Структура цены. Разработка сметы затрат и калькулирование себестоимости  Резервы роста прибыли и рентабельности. Маржинальный анализ  Основы оценки эффективности вложений в технику и технологию (улучшения на производстве)   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4011');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (158, 'Методы анализа и прогнозирования временных рядов
', 'online.edu.ru', '  1. Базовые понятия теории временных рядов   1.1. Понятие временных рядов и их типовые модели   1.2. Основные характеристики временных рядов   1.3. Выявление свойств и типов временных рядов на основе статистического и спектрального анализа  2. Анализ временных рядов   2.1. Разбиение временных рядов на компоненты   2.2. Типовые виды главных компонент, на основе моделей авторегрессии   2.3. Адаптивный анализ временных рядов и их частотно-временные характеристики  3. Прогноз временных рядов   3.1. Прогнозирование трендовой составляющей временного ряда   3.2. Прогнозирование временных рядов на основе моделей авторегрессии   3.3. Адаптивный прогноз и методы коррекции  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4033');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (140, 'Физическая оптика
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Электромагнитные волны в вакууме. Поляризация  Излучение света. Спектры  Распространение света в веществе, поведение на границе сред  Распространение света в различных средах  Дифракция Гюйгенса-Френеля-Кирхгофа и дифракция Фраунгофера  Интерференция  Уравнение эйконала, принцип Ферма, геометрическая оптика  Оптические приборы и голография   Каждая тема предполагает изучение в течение одной недели. На 5-й и 10-й неделях запланированы промежуточная и итоговая аттестации соответственно.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3991');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (141, 'Программирование и разработка веб-приложений
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Структуры данных Python 2. Функциональное программирование 3. Основы системного программирования 4. Объектно-ориентированное программирование – классы, объекты, наследование 5. Объектно-ориентированное программирование – декораторы и генераторы 6. Использование Python для работы с базой данных 7. Основы взаимодействия с Интернет 8. Использование библиотек Django для создания блога  Каждая тема изучается в течение одной недели. На пятой и десятой неделях предусмотрены промежуточный и итоговый интернет-экзамены соответственно.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3995');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (142, 'Реология
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Введение в реологию  Вязкоупругость  Ламинарное течение жидкостей в горизонтальных каналах  Течение степенной жидкости и среды Шведова-Бингама в трубах  Течение в различных рабочих каналах машин и аппаратов  Приборы и методы реометрии  Теория ротационных вискозиметров  Экспериментальные исследования реологических характеристик пищевых материалов  Итоговое занятие. О науке реологии, некоторых исследованиях и источниках информации по реологии   Тема "Течение в различных рабочих каналах машин и аппаратов" изучается в течение двух недель, остальные темы изучаются в течение одной недели. На 2-й, 4-й, 6-й , 8-й неделях запланированы виртуальные лаборатории, на 5-й и 9-й неделях – упражнения по пройденному материалу. На 10-й неделе запланирован интернет-экзамен.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): — мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; — жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3997');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (143, 'Управление мехатронными и робототехническими системами
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Математические основы теории систем 2. Открытый пакет для математических вычислений Scilab 3. Программирование контроллера Lego Mindstorms 4. Математическая модель двигателя постоянного тока 5. Расширенная модель двигателя постоянного тока 6. Пропорциональное регулирование 7. Система компьютерной алгебры Maxima 8. Маятниковые системы и их моделирование 9. Метод модального управления  Каждая тема предполагает изучение в течение одной недели. На 10-й неделе запланирован итоговый интернет-экзамен.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=3999');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (156, 'Информационные сервисы в управлении инженерной деятельностью
', 'online.edu.ru', '   Раздел 1. Введение    Раздел 2. Процессы жизненного цикла систем    Стандарт ISO/IEC 15288:2015 "Системная и программная инженерия. Процессы жизненного цикла систем"  Взаимодействие процессов жизненного цикла систем  Системная инженерия и проектное управление    Раздел 3. Управление информацией    Элементы модели данных  Гибкая разработка  Обобщение процессов   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4029');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (144, 'Основы архитектуры и строительных конструкций
', 'online.edu.ru', '  Курс состоит из пяти разделов: Раздел 1. Основные положения проектирования гражданских зданий. Требования, предъявляемые к гражданским зданиям. Классификация зданий и сооружений. Мероприятия по обеспечению пожарной безопасности малоэтажных гражданских зданий.  Раздел 2. Формирование остова здания Единая модульная система координации размеров в строительстве. Наружные стены. Внутренние стены и столбы. Светопрозрачные конструкции. Перекрытия.  Раздел 3. Проектирование скатных крыш. Крыша и кровля. Стропильная система.  Раздел 4. Подземная часть зданий. Основания зданий и сооружений. Фундаменты зданий и сооружений.  Раздел 5. Архитектурно-композиционные приемы создания образа зданий. Закономерности зрительного восприятия архитектурной формы. Средства гармонизации архитектурной формы.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4001');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (145, 'Основные концепции биологии и экологии
', 'online.edu.ru', '   РАЗДЕЛ 1. Биология – комплекс научных знаний о жизни   Тема 1.1. Жизнь как свойство материи  Тема 1.2. Биология – комплекс наук о жизни во всех ее проявлениях   РАЗДЕЛ 2. Клетка   Тема 2.1. Клеточная теория  Тема 2.2. Химический состав клетки  Тема 2.3. Пространственная организация клетки  Тема 2.4. Обмен веществ и энергии в клетке   РАЗДЕЛ 3. Воспроизведение биологических систем и индивидуальное развитие   Тема 3.1. Митоз  Тема 3.2. Мейоз  Тема 3.3. Размножение организмов   РАЗДЕЛ 4. Основы генетики и селекции   Тема 4.1. Законы Менделя и взаимодействие генов  Тема 4.2. Сцепленное наследование признаков. Генетика пола  Тема 4.3. Генетика человека  Тема 4.4. Наследственная и ненаследственная изменчивость  Тема 4.5. Селекция растений, животных и микроорганизмов   РАЗДЕЛ 5. Развитие органического мира   Тема 5.1. Современные представления об эволюции. Микроэволюция  Тема 5.2. Доказательства эволюции. Закономерности макроэволюции  Тема 5.3. Происхождение жизни  Тема 5.4. Происхождение и эволюция человека   РАЗДЕЛ 6. Биоразнообразие в природе   Тема 6.1. Царство Бактерии  Тема 6.2. Царство Грибы  Тема 6.3. Царство Растения  Тема 6.4. Царство Животные   РАЗДЕЛ 7. Основы экологии   Тема 7.1. Экология как наука. Экология особи  Тема 7.2. Популяционная экология  Тема 7.3. Экология биоценозов  Тема 7.4. Учение о биосфере. Глобальные экологические проблемы и пути их решения  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4003');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (146, 'Математический анализ
', 'online.edu.ru', '  Раздел 1. Введение в математический анализ. Функция, последовательность.Элементы теории множеств и математической логики. Способы задания функции. Виды функций. Последовательность. Пределы. Непрерывность функции. Точки разрыва  Раздел 2. Дифференциальное исчисление функций одной переменной.Понятие производной и дифференциала функции. Геометрический смысл производной и дифференциала. Производные основных элементарных функций. Правила дифференцирования. Способы вычисления производных. Производные высших порядков. Основные теоремы дифференциального исчисления. Исследование функций с помощью производных. Использование производных для решения прикладных задач  Раздел 3. Интегральное исчисление функций одной переменной.Неопределенный интеграл, его свойства. Методы интегрирования. Определенный интеграл и его приложения. Несобственные интегралы с бесконечными пределами и от неограниченных функций.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4005');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (147, 'Аккумуляторы, топливные элементы и их роль в современном мире
', 'online.edu.ru', '  1. Немного истории электромобилей.   Уроки истории. Рассвет электромобилей.  Уроки истории. Закат электромобилей.  Уроки истории. Забвение.  Кстати. Чем электромобили лучше.  Кстати. Электромобили и зима   2. Причины перемен и возрождения электромобилей.   Экология – загрязнение воздуха.  Экология –другие загрязнения.  Политика.  Экономика.  Век электричества.  А так ли чисты электромобили?  На всякий случай. Пик добычи нефти.   3. Электромобили и аккумуляторы.   Электромобили и гибриды. Классификация.  Пять основных параметров аккумулятора.  Электроавтобусы.  Электрические грузовики, корабли и самолеты.  Смежные технологии. Мотор-колесо.  Смежные технологии. Беспроводная зарядка.  Смежные технологии. Автономное вождение.  Производители аккумуляторов.  Продажи электромобилей.   4. Химические источники тока.   Принцип работы электрохимической ячейки.  Топливные элементы. Для чего?  Топливные элементы. Классификация.  Топливные элементы. Сравнение.  Топливные элементы. Дополнительная информация.  Ионисторы (суперконденсаторы).  Краткая история электрохимии.   5. Основные виды современных аккумуляторов.   Свинцово-кислотные аккумуляторы.  Никель кадмиевые, никель-железные и никель-металлгидридные аккумуляторы.  Литий-ионные аккумуляторы.  Классические и твердотельные аккумуляторы.   6. Электродные материалы.   Материалы для положительных электродов. LCO, NMC, NCA и другие материалы со слоистой структурой.  Материалы для положительных электродов. LMO и LNMO со структурой шпинели.  Материалы для положительных электродов. LFP со структурой оливина.  Материалы для отрицательных электродов. Материалы на основе углерода.  Материалы для отрицательных электродов. LTO со структурой шпинели.  Что дальше?   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4007');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (148, 'Программирование на C#
', 'online.edu.ru', '  1. Первое знакомство с C# Первое знакомство с C#. Типы данных. Методы. Области видимости 2. Ошибки Ошибки компиляции. Стилистические ошибки 3. Ветвления Логический тип bool. Оператор if-else. Типичные ошибки ветвлений 4. Циклы Цикл while. Цикл for 5. Массивы Одномерные массивы. Сокращенный синтаксис. Типы ссылки и типы значения. Многомерные массивы 6. Коллекции, строки, файлы Список List. Словарь Dictionary. Строки. Файлы и каталоги 7. Тестирование Введение в тестирование. Модульные тесты. Продвинутые техники. Внедрение тестирования 8. Сложность алгоритмов Основные понятия. О-символика. Оценка сложности алгоритмов 9. Рекурсивные алгоритмы Рекурсия. Перебор подмножеств. Перебор перестановок и размещений 10. Поиск и сортировка Линейный и бинарный поиск. Сортировка пузырьком. Сортировка слиянием и быстрая сортировка 11. Основы ООП Классы и объекты. Поля. Методы. Статистические классы 12. Наследование Наследование. Приведение типов. Интерфейсы. Полиморфизм 13. Целостность данных Целостность данных. Свойства. Конструкторы 14. Структуры Структуры. Ключевое слово ref. Boxing/unboxing. Структуры и свойства  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4009');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (150, 'Системная динамика устойчивого развития (Системная экология)
', 'online.edu.ru', '   Раздел 1. Системный подход    Определение системы, эмерджентность, использующая система, системы в операционном окружении, целевая система, подсистема текущий раздел  Функции и конструкции  Пример: Город как использующая система    Раздел 2. Системная методология    Модели и стейкхолдеры  Математическое моделирование. Сложность  Потребность, требование, архитектура    Раздел 3. Системный инструментарий    Функциональное моделирование  Системная динамика  Элементы системного анализа    Раздел 4. Популяционная модель    Установка и обзор программного обеспечения  Популяционная модель  Анализ популяционной модели    Раздел 5. Устойчивое развитие: социальный, экономический и экологический аспекты    Простейшая модель устойчивого развития  Большая модель устойчивого развития    Раздел 6. Обсуждение реальных экологических проектов    Краудсорсинг в задачах управления природными ресурсами   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4013');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (151, 'Основы педагогической деятельности
', 'online.edu.ru', '   Раздел 1. Введение в педагогическую деятельность   Тема 1. Педагогическая деятельность и педагогическая профессия. Сущность педагогического мастерства   Общая характеристика педагогической деятельности  Профессиональные характеристики педагога  Профессиональное мастерство педагога   Тема 2. Педагогика как наука  Тема 3. Из истории педагогической теории и практики   Основные вехи развития педагогической теории и практики  Компетентностная парадигма образования    Раздел 2. Психологические основы педагогической деятельности воспитания, обучения и развития   Тема 4. Категория личности в психологии  Тема 5. Психологические особенности обучающихся разного возраста  Тема 6. Обучение и воспитание как педагогическое взаимодействие  Тема 7. Развитие мотивации учебной деятельности  Тема 8. Педагогическая рефлексия как средство профессионального самосовершенствования педагога   Раздел 3. Дидактические основы педагогической деятельности   Тема 9. Процесс обучения: основные дидактические характеристики  Тема 10. Технологический подход к обучению   Раздел 4. Воспитание в педагогическом процессе   Тема 11. Основы воспитания в педагогической деятельности  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4015');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (152, 'Основы электротехники и электроники
', 'online.edu.ru', '  РАЗДЕЛ 1. Основы теории электрических цепей Тема 1. Основные понятия теории цепей. Идеализированные пассивные и активные элементы Тема 2. Система уравнений электрического равновесия Тема 3. Простейшие линейные цепи при гармоническом воздействии Тема 4. Методы расчета сложных электрических цепей Тема 5. Четырехполюсники Тема 6. Переходные процессы в цепях с сосредоточенными параметрами  РАЗДЕЛ 2. Электронные приборы Тема 1. Электропроводность полупроводников Тема 2. Физические процессы в p-n-переходе Тема 3. Полупроводниковые диоды Тема 4. Биполярные транзисторы Тема 5. Полевые транзисторы  РАЗДЕЛ 3. Усилители аналоговых сигналов Тема 1: Принципы построения усилительных схем. Тема 2: Усилительные каскады на биполярных транзисторах. Тема 3: Усилительные каскады на полевых транзисторах. Тема 4: Усилительные каскады на операционных усилителях (ОУ).  РАЗДЕЛ 4. Элементы цифровой электроники Тема 1: Базовые элементы цифровой электроники Тема 2: Схемотехника логических элементов Тема 3: Последовательностные схемы Тема 4: Комбинационные схемы Тема 5: Запоминающие устройства Тема 6: Цифро-аналоговые и аналого-цифровые преобразователи  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4017');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (153, 'Электродинамика
', 'online.edu.ru', '   РАЗДЕЛ 1. Теория электромагнитных волн    Тема 1.1: Векторы электромагнитного поля. Параметры и классификация сред  Тема 1.2: Основные законы и уравнения электромагнитного поля  Тема 1.3: Уравнения монохроматического электромагнитного поля  Тема 1.4: Плоские электромагнитные волны в неограниченных средах  Тема 1.5: Отражение и преломление плоских волн на границе раздела двух сред    РАЗДЕЛ 2. Излучение электромагнитных волн и элементарные излучатели    Тема 2.1: Источники электромагнитного поля  Тема 2.2: Решение уравнений Максвелла в задачах излучения  Тема 2.3: Элементарные излучатели электромагнитного поля   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4022');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (154, 'Инженерная механика
', 'online.edu.ru', '       I  .     Статика:    Основные понятия и аксиомы статики.  Связи и их реакции. Построение FBD.  Основная теорема статики.  Условия равновесия тел.  Центр тяжести.    II  . Кинематика:    Способы задания движения точки и твердого тела. Определение кинематических характеристик точки и твердого тела.  Простейшие движения твердого тела.  Сложное движение точки (тела).  Плоское движение твердого тела.    III Динамика    Динамика материальной точки  Динамика механической системы  Метод кинетостатики       ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4024');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (155, 'Начертательная геометрия и инженерная графика
', 'online.edu.ru', '  Раздел 1. Предмет и метод начертательной геометрии Метод проецирования. Инвариантные свойства параллельного проецирования  Раздел 2. Задание геометрических объектов на чертеже Ортогональный чертеж точки. Ортогональные чертежи прямой. Ортогональные чертежи плоскости Принадлежность точки и линии плоскости  Раздел 3. Позиционные задачи Пересечение прямой линии с плоскостью Пересечение плоскостей Параллельность геометрических объектов Перпендикулярность геометрических объектов. Чертежи многогранников  Раздел 4. Способы преобразования чертежа. Метрические задачи Способ замены плоскостей проекций Способ плоскопараллельного перемещения и вращения  Раздел 5. Кривые линии. Поверхности Плоские кривые линии. Кривые второго порядка. Пространственные кривые линии. Винтовые линии. Классификация поверхностей Способы задания поверхностей. Поверхности вращения. Сечение поверхностей плоскостью Пересечение прямой линии с поверхностью  Раздел 6. Пересечение поверхностей Обобщенные позиционные задачи Способ вспомогательных секущих плоскостей Способ вспомогательных секущих концентрических сфер. Частные случаи пересечения поверхностей второго порядка.  Раздел 7. Развертки Развертки. Приближенные развертки развертывающихся поверхностей Условные развертки неразвертывающихся поверхностей вращения  Раздел 8. Государственные стандарты Значение стандартизации. Государственная система стандартов ЕСКД.  Раздел 9. Общие правила оформления конструкторской документации Виды изделий. Виды и комплектность конструкторских документов. Стадии разработки конструкторской документации. Общие правила оформления чертежей.  Раздел 10. Изображение изделий на чертежах ГОСТ 2.305-2008 «Изображения-виды, разрезы, сечения».  Раздел 11. Изделия с винтовыми поверхностями Основные параметры резьбы. Классификация резьб. Условное изображение резьбы. Изображение и обозначение стандартных резьбовых изделий  Раздел 12. Рабочие чертежи деталей Основные требования к рабочим чертежам  Раздел 13. Виды соединений Разъемные соединения. Неразъемные соединения  Раздел 14. Сборочные чертежи изделий. Деталирование чертежей общего вида Сборочные чертежи. Спецификация. Упрощения на сборочном чертеже Чертежи общего вида изделий. Последовательность этапов деталирования.  Раздел 15. Компьютерная 3D технология разработки конструкторской документации Общие принципы САПР Autodesk Inventor Создание детали Выполнение рабочего чертежа детали Конструирование изделия Использование библиотеки компонентов Проектирование сварной конструкции Сборочный чертеж изделия. Спецификация Демонстрация сборки-разборки  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4027');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (159, 'Основы метрологии, стандартизация и оценка соответствия
', 'online.edu.ru', '  Раздел 1. Стандартизация   Качество и техническое регулирование  Технические регламенты  Цели, принципы и методы стандартизации  Система стандартизации Российской Федерации  Региональная и международная стандартизация   Раздел 2. Оценка соответствия   Формы оценки соответствия  Подтверждение соответствия  Обязательная и добровольная сертификация  Декларирование соответствия  Система обязательного подтверждения соответствия в условиях Евразийского союза (Таможенного союза)  Признание результатов подтверждения соответствия   Раздел 3. Основы метрологии   Метрология как вид деятельности  Государственная система обеспечения единства измерений  Классификация методов и средств измерений  Точность методов и результатов измерений  Поверка и калибровка средств измерений   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4035');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (160, 'Философия и история науки и техники
', 'online.edu.ru', '  Модуль 1. To be or not to be: мыслить или не мыслить? Как работает человеческое мышление? Изобретение мира: чему инженер может научиться у философа Откуда берутся проблемы  Модуль 2. В поисках парадигмы... От мифа к логосу: Платон или Аристотель Зарождение рациональности: очевидное и невероятное Реконструкция рациональности: выход – это вход  Модуль 3. Россия - родина слонов... Опыт русской гипотезы Русский мастер: создание альтернативной реальности Поле боя науки: против лома нет приема  Модуль 4. Создавая будущее Стратегии креативного мышления Инновация как способ изменения мира Будущее науки – будущее техники  Модуль 5. Последовательность в хаосе «Число – это вещь, вещь – это число»: опыт символического мышления Ловушки Интернета: измененное сознание Предел науки: искусственный интеллект  Модуль 6. Инженерная философия техники  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4037');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (161, 'Технологии программирования
', 'online.edu.ru', '  Курс состоит из следующих разделов:   Введение.  Очереди, стеки, дженерики  yield return  Листы и словари  Делегаты  Элементы функционального программирования  LINQ  Графы и обходы  Жадные алгоритмы  Динамическое программирование  Структуры данных  События  Оконные приложения  Асинхронное программирование  Рефлексия типов     ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4039');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (162, 'Культура русской деловой речи
', 'online.edu.ru', '   Введение. Актуальность изучения дисциплины «Культура русской деловой речи»   Раздел 1. Современный русский литературный язык как основа профессиональной коммуникации  Тема 1. Сведения о современном русском литературном язык как основе культуры деловой речи Тема 2. Функционально-стилевая дифференциация русского литературного языка ХХ в. Тема 3. Нормы литературного языка как основа профессиональной речи  Раздел 2. Устная форма конструктивного делового общения  Тема 4. Основные принципы успешного речевого взаимодействия Тема 5. Виды и способы речевого взаимодействия: техники диалога и основы полемического мастерства Тема 6. Невербальные и неречевые виды деятельности в устном общении  Раздел 3. Ораторская речь  Тема 7. Публичная речь в деловом общении Тема 8. Основы ораторского мастерства Тема 9. Общие требования к публичной речи  Раздел 4. Письменная форма делового общения  Тема 10. Особенности письменной коммуникации в деловой сфере Тема 11. Требования к языку и стилю письменной деловой речи Тема 12. Составление и оформление личной документации  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4041');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (163, 'Основы цифровой обработки сигналов
', 'online.edu.ru', '   РАЗДЕЛ 1. Модели и преобразования дискретных и цифровых сигналов   Тема 1.1. Введение. Аналоговые, дискретные и цифровые сигналы и системы  Тема 1.2. Математическое описание дискретных сигналов. Теорема Уиттекера – Котельникова – Шеннона  Тема 1.3. Дискретное преобразование Фурье. Корреляция и свертка дискретных последовательностей  Тема 1.4. Алгоритмы быстрого преобразования Фурье  Тема 1.5. Алгоритм БПФ с произвольным основанием  Тема 1.6. Основы теории Z – преобразования. Взаимосвязь между непрерывными и дискретными преобразованиями     РАЗДЕЛ 2. Дискретные и цифровые фильтры   Тема 2.1. Линейные дискретные и цифровые фильтры и их характеристики  Тема 2.2. Формы реализации линейных дискретных фильтров  Тема 2.3. Реализация линейных цифровых фильтров в частотной области с помощью алгоритмов БПФ. Цифровой спектральный анализ  Тема 2.4. Проектирование фильтров с КИХ  Тема 2.5. Синтез рекурсивных цифровых фильтров по аналоговому прототипу  Тема 2.6. Метод билинейного Z-преобразования     РАЗДЕЛ 3. Эффекты квантования и округления в цифровых фильтрах   Тема 3.1. Эффекты квантования сигнала  Тема 3.2. Эффекты округления результатов арифметических операций. Квантование коэффициентов в цифровых фильтрах     РАЗДЕЛ 4. Применение цифровых методов и устройств   Тема 4.1. Изменение частоты дискретизации в линейных цифровых фильтрах  Тема 4.2. Цифровые модуляторы и демодуляторы  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4043');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (164, 'Самоменеджмент
', 'online.edu.ru', '  І. Самоменеджмент: функциональный и личностный подходы   1.  Понятие самоменеджмента и его взаимосвязь с другими дисциплинами.    Понятие и предназначение самоменеджмента. История теоретических и практических основ самоменеджмента. Роль российской школы в истории дисциплины (А.К. Гастев, П.М. Керженцев). Связь с общей теорией систем, классической теорией управления, логикой, общей и социальной психологией, психофизиологией.   2. Человек как система   Человек как система. Саморегуляция и самоорганизация. Понятие личностного потенциала и его саморазвития. Роль самоменеджмента в развитии потенциала личности. Самодиагностика личностного потенциала к самоуправлению и саморазвитию.   3. Различие функционального и личностного подхода в самоменеджменте   Функции самоменеджмента: целеполагание, планирование, принятие решения, организация и исполнение, контроль, информация и коммуникация. Модель качеств менеджера, умеющего управлять самим собой: способность правильно формулировать жизненные цели, личная организованность, самодисциплина, знание техники личной работы, способность делать себя здоровым, эмоционально-волевой потенциал, самоконтроль своей жизнедеятельности. Основополагающая роль целеполагания в системе самоуправления. Информация и коммуникация, как ресурсы власти и влияния.   ІІ. Самоменеджмент как технология. Тайм-менеджмент    1 . Время, как ресурс, и его значение в менеджменте и самоменеджменте .  Понятие тайм-менеджмента. Принципы и методы эффективного использования времени. Психологическая устойчивость личности как фактор экономии времени для достижения личного и командного результата. «Амплитуда отклонений» от прямой движения к цели и легенды успешных людей. Планирование и стратегия. Виды планирования. Индивидуальные особенности планирования. Техники планирования: «Диаграмма Гантта», метод «Альпы», «Принцип Парето». Технические средства поддержки планирования. Применение метода бенчмаркинга (benchmarking) в тайм-менеджменте. Принятие решения или мера личной ответственности. Техники расстановки приоритетов. Продуктивное отношение к изменениям. Самодиагностика «Ловушек времени». Построение индивидуального профиля управления временем.   2. Ритмология и работоспособность. Организация и исполнение. Контроль в управлении временем.   Темпо-ритмические характеристики управления временем. Работоспособность организма: генетика, практика, искусство. Техники продуктивной организация и исполнения намеченных планов. Виды органайзеров. Правила и техники контроля личного времени. Хронометрах и его контрольная функция. Фотография рабочей недели. Контрольные таблицы как техника обратной связи.   3.Техники коммуникации и работы с информацией.    Виды, формы и способы коммуникации для улучшения качества отношений с людьми. Техники и практики вопросов и ответов в искусстве управления временем. Эффективные переговоры. Умение говорить «нет». Виды и формы восприятия информация. Способы получения обратной связи от других людей. Формирование зрительного образа. Средства работы с техникой и документами в поисках нужной информации: электронные поисковые системы.   ІІІ. Карьерное планирование    1.  Понятие профессиональной карьеры и ее развитие.    Профессиональная карьера: понятие, сущность, основные этапы. Внутренние противоречия и борьба мотивов – движущая сила профессионального становления. Развитие деловой карьеры.   2.  Управление личной карьерой.  Эффективный самомаркетинг на этапе профессиональной подготовки. Психодиагностика мотивации, интеллекта и профессионально-важных качеств личности. Определение профессиональных приоритетов и постановка задач карьеры. Необходимость постоянных изменений и принципы сбалансированного самообновления (С.Р.Кови). Карьерограмма и профессиональное продвижение Технические средства поддержки долгосрочного карьерного планирования.  3. Карьера менеджера.   Делегирование полномочий.   Карьера менеджера: понятии, сущность и стадии развития. Имидж успешного руководителя. Качества современного руководителя. Целенаправленное развитие личности. Факторы, влияющие на управленческую деятельность (Вудкок М., Фрэнсис Д. и др.). Стадии деловой жизни менеджера. Понятие о делегировании полномочий. Интеллектуальные роли в команде (модель Кейрси). Командные роли в концепции Р.М.Белбина. Принципы персонального видения и лидерства. Формирование общего видения в команде и стиль управления. Диагностика стиля управления.   IV. Команда и командообразование    1.Понятие команды и командообразования.   Понятие и признаки команды. Этапы командообразования и их специфика. Основы управления малой группой: отличительные особенности целеполагания, принятия решения, организации и координации выполнения деятельности. Управление групповыми процессами. Групповая сплоченность и синергия. Диагностическая компетентность и управление обратной связью. Самодиагностика управленческой компетентности.   2.   Технологии командообразования.   Деловые и ролевые игры в развитии навыков командной работы. Техники коммуникации в малой группе. Умение действовать по правилам и приходить к согласию в процессе групповой работы в условиях ограниченного временного ресурса. Метод индивидуальной и групповой рефлексии в корректирующих решениях. Технология этического анализа собственных и коллективных действий при выполнении задания. Формы оценки результата и способов достижения целей в условиях моделирующих ситуаций в процессе деловых и ролевых игр.   V  . Инструменты и методы и повышения личной эффективности    1.   Понятие самомотивации. Роль самомотивации в развитии личной эффективности.   Понятие и принципы самомотивации. Актуальность неосознаваемых установок в управлении личной эффективностью. Стереотипы. Вариативность. Принцип алгоритма. Методы работы с негативной информацией. Внутренняя игра: размышления и наблюдения за профессионалом. Майевтика и внутренний диалог.  2. Стиль жизни в режиме самоменеджмнта.   Критерии и характеристики эффективного отдыха. Фитнес на работе и дома. Анализ самомотивации Управление стрессами. Сбалансированная система эффективного отдыха. Интеллектуальное и духовное развитие, как основа личной эффективности. Сам себе коуч: понятие самокоучинга, техники построения «Колеса баланса» и «Мастер-плана».  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4045');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (165, 'Практики системной инженерии
', 'online.edu.ru', '   Раздел 1. Введение в практики системной инженерии    Раздел 2. Анализ потребностей и требований    Разделение зон ответственности  Потребности и требования    Раздел 3. Концепция использования (Concept of operations)    Функциональное моделирование использующей системы  Модели жизненного цикла  Бизнес-анализ  Определение границ системы    Раздел 4. Определение системы (System definition)    Функциональное моделирование системы  Определение архитектуры системы  Системная спецификация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4048');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (168, 'Теплотехника
', 'online.edu.ru', '    Раздел 1. Техническая термодинамика. Основные понятия и определения термодинамики Первое начало термодинамики Термодинамические процессы идеальных газов Второе начало термодинамики Термодинамика фазовых переходов Термодинамика потока Термодинамический расчёт и анализ циклов тепловых двигателей Термодинамический расчёт и анализ циклов паросиловых установок (ПСУ)  Раздел 2. Основы теории теплообмена Введение. Основные понятия и определения. Способы и процессы переноса теплоты Теплообмен излучением Конвективный и сложный теплообмен Стационарная теплопроводность Нестационарная теплопроводность Теплопередача Теплообменные аппараты  Раздел 3. Энергетическое оборудование Общая классификация и характеристика твердого, жидкого и газообразного видов топлива Теплота сгорания топлива Методика расчета горения топлива Особенности сжигания органических топлив Тепловой баланс котла Конструкции котельных установок Компрессоры Повышение эффективности использования топливно-энергетических ресурсов  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4054');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (169, 'Теория решения изобретательских задач
', 'online.edu.ru', '  Курс состоит из пятнадцати разделов и начинается с рассмотрения вопросов процесса создания инноваций, рассмотрению критериев и уровней инновационных изделий.  В разделах будут подробно рассмотрены вопросы:   Исследование совершенствуемого объекта через системный оператор  Функциональное исследование совершенствуемого объекта  Понятие идеальности системы и методы достижения идеальности  Понятие оперативного места и оперативного времени  Представление задач через противоречие. Формулирование противоречий  Инструменты устранения противоречий  Причинно-следственный анализ исходно заданных недостатков  Вещественно-полевые ресурсы в технических система  Функционально-идеальное свёртывание технических систем  Алгоритмы решения изобретательских задач  Представление задач через типовые структурные модели  Функционально ориентированный поиск  Основные правила вепольного анализа  Линии жизни технических систем   Все разделы подкреплены примерами практической деятельности разработчиков курса, имеющих большое количество реализованных проектов с реальным сектором экономики.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4056');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (170, 'Экономическая социология
', 'online.edu.ru', '  1. Предмет экономической социологии 2. Модель человека в экономической социологии 3. История экономической социологии 4. Человек в роли предпринимателя 5. Человек на рынке труда 6. Человек в трудовых отношениях 7. Человек в домашнем хозяйстве 8. Человек в роли потребителя 9. Человек в денежном хозяйстве 10.Человек в социальной иерархии 11.Рынок как форма хозяйства 12.Государственное регулирование хозяйства 13.Неформальная экономика как форма хозяйства  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4058');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (171, 'История и теория медиа
', 'online.edu.ru', '   Неделя первая:  Представляются основные понятия сферы медиа: медиа, коммуникация, информация, масс-медиа, СМИ иСМК  Неделя вторая:  Представлена основная логика развития обществ через изменения коммуникативных систем, медианосителей, методов контроля медиа  Неделя третья:  Наэтой неделе мысовершим исторический экскурс вмеханизмы контроля ирегулирования содержания массовых коммуникаций, начиная отсредневековых цензурных уставов истатутов изаканчивая преимущественно конституционными принципами, регулирующими свободу слова.  Неделя четвертая:  Эта неделя посвящена изучению социальной истории основных медианосителей исредств коммуникации. Мырассмотрим различные системы письменности, материальные формы книги, электрические системы передачи информации (телеграф ителефон) ито, как это повлияло насоциальные практики.  Неделя пятая:  Наэтой неделе мыбудем заниматься классификацией теорий медиа иобзором предметов исследования вразличных теориях. После этого мыначнем разбирать три самых ранних группы теорий. Начнем сэмпирико-функционалистской группы теорий, которая занималась изучением эффектов ифункций медиа вобщественной жизни.  Неделя шестая:  Второй основополагающей группой теорий была «Критическая теория», рассматривающая медиа как институты, воспроизводящие капитализм исоциальную иерархию.  Неделя седьмая:  Третьей основополагающей группой теорий является лингвистическая группа теорий, рассматривающая медиа через призму сообщений итекстов, которые они продуцируют.  Неделя восьмая:  Наэтой неделе мыначнем рассматривать современные социальные теории медиа. Иначнем стеории информационного исетевого общества, атакже идей медиадетерминизма Маклюэна иИнниса.  Неделя девятая:  Здесь мырассмотрим социальные теории, рассматривающие как медиапроцесс распространение ивнедрение инноваций  Неделя десятая:  Вэтой части курса будут рассмотрены микросоциальные теории, связанные скоммуникациями. Сюда относится этнометодология медиа, символический интеракционизм и т. д.  Неделя одиннадцатая:  Здесь мыразберем социальные теории медиапотребления иCultural Studies.  Неделя двенадцатая:  Вданном компоненте курса мырассмотрим политэкономические современные медиатеории. Впервую очередь проблему медиакапитала. Затем мыкоснемся темы культурных икреативных индустрий спозиций представителей политической экономии массовых коммуникаций.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4060');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (172, 'Основные направления развития охраны труда в современном мире
', 'online.edu.ru', '  Название темы 1: Введение в охрану труда: основные понятия и направления (правовые, технические и медицинские аспекты)  Название темы 2: Актуальные международные стандарты в области охраны труда: обязательность vs добровольность  Название темы 3: Управление охраной труда в современном мире: консультации, профилактика, комплайенс (комплексный подход); новые формы выявления и анализа рисков (мобильные устройства, автономный сбор информации, big data, увеличение горизонтов анализа и др.); стратегическое планирование, масштабируемость решений; роль инспекторов ОТ в новых условиях (требования к профилю, функции); новые формы обучения работников по охране труда (онлайн-ресурсы, мобильные технологии, сторителлинг и др.)  Название темы 4: Экономические аспекты охраны труда: охрана труда в периоды экономической рецессии и кризиса  Название темы 5: Организационно-управленческие риски: новые формы трудовых отношений, менеджмент талантов, гибкое рабочее время, мультитаскинг, необходимость учета новых «особенностей здоровья» (дислексия/дисграфия, СДВ(Г), РАС, избыточная полнота и др.)  Название темы 6: Физические и физиологические риски: гиподинамия, температурные экстремумы, УФ-радиация, проблемы кондиционирования, мультифакторные риски/комплексное воздействие и др.  Название темы 7: Биохимические риски: профтоксикология и профэпидемиология  Название темы 8: Социально-психологические риски на работе: физическая и психологическая жестокость, интенсификация труда, угроза безработицы, разобщенность коллективов, усложнение аппаратных интерфейсов, старение населения и др.  Название темы 9: Влияние окружающей среды на производственное здоровье: экология производственных процессов, корпоративная социальная ответственность, корпоративное гражданство  Название темы 10: Охрана труда дистанционных работников и работников на аутсорсинге  Название темы 11: Охрана труда в контексте глобальной трудовой миграции  Название темы 12: Обеспечение охраны труда в транснациональном бизнесе  Название темы 13: Обеспечение охраны труда на средних, малых и микропредприятиях  Название темы 14: Основные выводы: охрана труда и глобальные проблемы здоровья человечества  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4063');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (173, 'Психология межгрупповых отношений
', 'online.edu.ru', '   Что изучает психология межгрупповых отношений? Предмет и методы исследования  Что такое «предубежденная личность»? Индивидуальный подход  Какие группы вступают в конфликт? Групповой подход  Как мы представляем группу? Стереотипы и межгрупповые эмоции  Как мы оцениваем группу? Предрассудки  Как мы относимся к «своим» и «чужим»? Межгрупповая дифференциация Как мы реагируем на групповую дискриминацию? От психологического благополучия к действиям  Как мы реагируем на групповую дискриминацию? Реакция на «стереотипную угрозу» Как мы реагируем на групповую дискриминацию? Коллективное поведение  Как формируются стереотипы и предрассудки? Стадии и институты социализации  Как улучшить межгрупповые отношения? Изменение стереотипов и предрассудков  Как улучшить межгрупповые отношения? Организация контакта   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4066');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (174, 'Философия
', 'online.edu.ru', '  Модуль 1. Что такое философия?  Модуль 2. Истина.  Модуль 3. Красота.  Модуль 4. Добро.  Модуль 5. Человек.  Модуль 6. Общество.  Модуль 7. История.  Модуль 8. Культура.  Модуль 9. Мир.  Модуль 10. Вера.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4069');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (180, 'Демография
', 'online.edu.ru', '  Лекция 1. Наука демография Лекция 2. Источники демографических данных Лекция 3. Состав населения по полу и возрасту Лекция 4. Основные принципы демографического анализа Лекция 5. Таблицы смертности Лекция 6. Смертность Лекция 7. Рождаемость Лекция 8. Брачность Лекция 9. Миграция населения Лекция 10. Демографические модели Лекция 11. Демографический переход Лекция 12. Демографические прогнозы  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4083');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (175, 'Анализ инвестиционных проектов и программ
', 'online.edu.ru', '   Тема 1.  Основные игроки на рынке реального инвестирования. Цели выхода на рынок реального инвестирования   Тема 2.  Качественный анализ инвестиционных идей. От инвестиционной идеи к бизнес-плану и финансовой модели   Тема 3.  Инвестиционный проект и его экономическая эффективность. Общие принципы анализа   Тема 4.  Финансовая модель инвестиционного проекта   Тема 5.  Критерии проверки на экономическую эффективность: ситуация определенности и риска   Тема 6.  Ловушки инвестиционной аналитики   Тема 7.  Экономический анализ рисков инвестирования   Тема 8.  Источники финансирования инвестиционных проектов и программ и финансовые риски инвестирования   Тема 9.  От инвестиционного проекта к портфелю проектов   Тема 10.  Риск как конкурентное преимущество в реализациии нвестиционных проектов и программ. Цена управленческой гибкости  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4071');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (176, 'Социокультурные аспекты социальной робототехники
', 'online.edu.ru', '  Онлайн-курс состоит из десяти недель:  Вводный раздел  Приветствие  Раздел 1. Кто такой социальный робот?  1.1. Как мы определяем робота?  1.2. Что такое социальное взаимодействие?  1.3. Почему появились социальные роботы?  1.4. Знакомьтесь – социальный робот  Раздел 2.  2.1 Что будут делать социальные роботы?  2.2 Интервью с экспертами  Раздел 3.Роль культуры в формировании представлений о социальном роботе  3.1. Откуда взялись социальные роботы?  3.2. «Западные» социальные роботы  3.3. «Восточные» социальные роботы  3.4. Наши стереотипы о роботах и почему они важны  Раздел 4.  4.1 Интервью к разделу 4  Раздел 5.Как должен выглядеть социальный робот?  5.1. Типы интерфейсов социальных роботов  5.2. Эффект зловещей долины  5.3. Эстетика, Красота и социальные роботы  5.4. Как исследуют восприятие внешности робота?  Раздел 6.  6.1 Интервью к разделу 6  Раздел 7. Этика и социальная робототехника  7.1. Зачем нам нужна этика, когда мы говорим о социальных роботах?  7.2. Этические законы робототехники  7.3. Робоэтика  7.4. Некоторые этические вопросы взаимодействия человека и социального робота  Раздел 8.  8.1 Интервью к разделу 8  Раздел 9. Социальные роботы рядом с нами  9.1. Вызовы социальной робототехники  9.2. Какие социальные роботы уже есть сегодня?  Раздел 10. Заключение   Перед итоговой аттестацией проводится вебинар.   Итоговая аттестация.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4073');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (177, 'Теория организации
', 'online.edu.ru', '  1.Понятие и сущность организации. 2. Классические виды организационных структур. 3. Современные типы организационных структур. 4. Контекстуальный подход: стратегия и структура. 5. Контекстуальный подход: технология, размер и стадия жизненного цикла. 6. Контекстуальный подход: культура и внешняя среда. 7. Энвайронментальные концепции организации. 8. Энвайронментальные концепции: продолжение. 9. Организационное развитие. 10. Организационное развитие: продолжение.  УЧЕБНЫЙ ПЛАН:  Неделя 1. Понятие и сущность организации. Место ТО в системе наук. Понятие организации. Эволюция теории организации. Функции организации как социальной системы. Естественная, искусственная системы. Классификация типов организации (Ч. Барнард, А.И. Пригожин).  Неделя 2. Классические виды организационных структур. Определение организационной структуры, формальная и неформальная структура. Структурные характеристики организации. Линейная структура управления. Функциональная и линейно-функциональная структуры. Дивизиональная структура. Сравнение функциональной и дивизиональной структур.  Неделя 3. Современные типы организационных структур. Функциональные связи. Проектная структура. Матричная структура. Современные комплексные организации. Модели организации Г. Минцберга.  Неделя 4. Контекстуальный подход: стратегия и структура. Ситуационные модели, контекстные переменные. Модель Чандлера. Модель Портера. Модель Майлза и Сноу. Типология стратегических целей В.И. Герчикова. Модель структурного соответствия.  Неделя 5. Контекстуальный подход: технология, размер и стадия жизненного цикла. Технология: модель Дж. Вудворд. Технология: кастомизированное производство. Технология сервиса. Размер: исследование Астонской группы. Нормативные характеристики организаций разных размеров. Модель жизненных циклов Адизеса. Функции менеджмента на разных стадиях жизненного цикла.  Неделя 6. Контекстуальный подход: культура и внешняя среда. Культура организации и структура. Понятие внешней среды, микро- и макроокружение. Проблема границ организации. Открытая и закрытая системы. Размерности и типы внешней среды. Ситуационная модель Дункана.  Неделя 7. Энвайронментальные концепции организации. Модель Бернса и Сталкера (Дафт). Неоинституциональная теория: базовый подход. Реакции организации на институциональное давление. Институциональный изоморфизм: соревновательный и институциональный "миры организаций". Парадокс Стокдейла.  Неделя 8. Энвайронментальные концепции: продолжение. Организационная экология: базовые положения. Основные выводы организационных экологов. Теория ресурсной зависимости: классический подход. Теория ресурсной зависимости: современная версия. Итоги: реакция организации на изменения внешней среды.  Неделя 9. Организационное развитие. Типы организационных изменений. Критерии организационного развития. Основные модели организационного развития. Структурно-ситуационная модель. Инновационная концепция развития организации: процесс изменений. Инновационная концепция развития организации: методы осуществления изменений. Инновационная модель В.С. Дудченко. Супер-цели.  Неделя 10. Организационное развитие: продолжение. Неоинституциональная теория организационного развития. Развитие с позиций организационной экологии. Развитие организации в теории жизненных циклов. Поддержание жизнеспособности "долгоживущих" организаций. Школа социальных систем. Оценка эффективности организационной структуры.    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4075');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (178, 'Введение в корпусную лингвистику
', 'online.edu.ru', '   Неделя 1. Интернет и развитие гуманитарного знания   Неделя 2. Что такое «корпус»?   Неделя 3. Возникновение и развитие корпусной лингвистики   Неделя 4. Виды корпусов   Неделя 5. Поиск информации в корпусе   Неделя 6. Разметка корпусов   Неделя 7. Исследование языка с помощью лингвистического корпуса: общие принципы   Неделя 8.  Исследование языка с помощью лингвистического корпуса: направления исследования и практическое применение результатов   Неделя 9. Корпусное преподавание   Неделя 10. Корпус и междисциплинарные исследования  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4077');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (179, 'Защита информации
', 'online.edu.ru', '  1. Основы информационной безопасности. Основные понятия и определения 2. Политика государства в области информационной безопасности 3. Угрозы и нарушители безопасности информации 4. Модель угроз безопасности информации 5. Меры обеспечения защиты информации 6. Организационные меры защиты информации 7. Методы контроля и разграничения доступа 8. Исторический обзор криптографических методов защиты информации 9. Криптографические методы защиты информации 10. Стеганографическая защита информации 11. Техническая защита информации 12. Программно-технические меры защиты информации 13. Политика безопасности организации 14. Системы обнаружения и предотвращения компьютерных атак 15. Основные стандарты в области информационной безопасности  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4080');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (182, 'Элементы систем автоматического управления
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Введение. Одномассовые и многомассовые объекты  Описание и принцип работы системы «двигатель – механизм»  Управляемый электрический преобразователь. Переходные процессы  Устройство управления. Регуляторы  Оптимизация системы. Настройка на Технический и Симметричный оптимумы  Контур регулирования момента  Контур регулирования скорости  Контур регулирования положения  Двухконтурная система регулирования скорости  Двухконтурная система регулирования положения   Каждая тема предполагает изучение в течение одной недели. На 2-й, 4-й, 6-й и 9-й неделях запланированы упражнения по пройденному материалу. На 3-й, 5-й, 7-й, 8-й и 10-й неделях запланированы упражнения в пакете Scilab. На 11-й неделе запланирован интернет-экзамен.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4089');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (183, 'Анализ финансовых рынков
', 'online.edu.ru', '   Тема 1.  Фундаментальный и технический анализ на рынке ценных бумаг. Введение в проблематику   Тема 2.  Роль финансовых аналитиков в анализе акций   Тема 3.  Поиск «качественных» компаний и акций. Сопоставление акций по финансовым показателям компаний. Почему не обязательно всегда рассчитывать справедливую стоимость акции?   Тема 4.  Поиск относительно дешевых акций. Как найти недооцененные и переоцененные акции?   Тема 5.  Принципы фундаментального анализа для сопоставления страновых фондовых индексов   Тема 6.  Дополнительные факторы, учитываемые при оценке инвестиционной привлекательности акций в фундаментальном анализе   Тема 7.  Принципы технического анализа. Понятие графика. Тенденции   Тема 8.  Анализ графических фигур. Скользящие средние   Тема 9.  Индикаторы цен. Индикаторы объёма   Тема 10.  Осцилляторы  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4091');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (184, 'Финансовые рынки и институты
', 'online.edu.ru', '  1. Общие понятия финансового рынка 2. Секьюритизация 3. Риск и доходность 4. Финансовые институты 5. Фонды коллективного инвестирования. Страхование 6. Рынок долгового капитала 7. Рынок акций 8. Гибридные ценные бумаги 9. Выход компаний на зарубежные рынки капитала 10. Управление личными финансами - 1 11. Управление личными финансами - 2 12. Итоговый тест  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4094');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (185, 'Методы и алгоритмы теории графов
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Основы теории графов 2. Связность графов 3. Циклы в графах 4. Деревья 5. Оптимизация на графах 6. Двудольные графы 7. Изоморфизм и гомеоморфизм графов 8. Плоские и планарные графы  Тема "Оптимизация на графах" изучается в течение двух недель, остальные темы изучаются в течение одной недели. На 10-й неделе запланирован интернет-экзамен.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4096');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (186, 'Общая социология
', 'online.edu.ru', '   Неделя 1.   Тема 1.   Социология как наука: Что и как изучает социология.  Общая характеристика социологии, ее основные черты и особенности.   Неделя 2.   Тема 2.   Культура и общество.  Взаимосвязь социальных и культурных процессов и явлений.   Неделя 3.   Тема 3.   Социальные институты.  Сущность социальных институтов, их структура, функции, значение.   Неделя 4.   Тема 3.1.   Семья как социальный институт.  Обзор социального института семьи.   Неделя 5.   Тема 3.2.   Экономика как социальный институт.  Обзор социального института экономики.   Неделя 6.   Тема 3.3.   Религия как социальный институт.  Обзор социального института религии.   Неделя 7.   Тема 4.   Социализация индивида.  Процесс социализации, подходы к ее изучению,способы и агенты, особенности в современных обществах.   Неделя 8.   Тема 5.   Социальные группы и организации.  Природа и типы социальных групп, формальные организации, бюрократия, община.   Неделя 9.   Тема 6.   Социальные равенства и неравенства.  Социальные равенства и неравенства как реальность, ценность, идеал; социальная стратификация и типы; социальная мобильность.   Неделя 10.   Тема 7.   Социальные процессы и социальные изменения.  Обмен, кооперация, конкуренция, конфликт, солидарность как социальные процессы. Сущность и факторы социальных изменений.   Неделя 11.   Тема 8.   Массовое поведение, массовые сообщества и социальные движения.  Специфика массовых процессов (мода, паника, слухи, массовая истерия и паранойя). Массовые сообщества: конгломераты, толпы, публики. Природа и значение социальных изменений для социального развития.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4098');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (187, 'Введение в современную политическую науку
', 'online.edu.ru', '   Тема 1.  Мир политики: подходы к осмыслению и познанию   Тема 2. Политическая власть, авторитет и легитимность   Тема 3. Политические институты и институциональный подход   Тема 4. Государство и государственность   Тема 5. Избирательные и партийные системы, формы правления и территориального устройства власти   Тема 6. Политические режимы: тоталитаризм и авторитаризм   Тема 7. Политические режимы: демократия   Тема 8. Политические изменения и политическое развитие   Тема 9. Политическая культура   Тема 10. Политические идеологии  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4100');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (188, 'Эконометрика
', 'online.edu.ru', '   Метод наименьших квадратов  Статистические свойства оценок коэффициентов  Введение в R  Дамми-переменные, сравнение вложенных моделей  Графики, фиктивные переменные и прогнозы в R  Мультиколлинеарность  Гетероскедастичность  Мультиколлинеарность и гетероскедастичность в R  Автокорреляция  Метод максимального правдоподобия, модели бинарного выбора  Автокорреляция и модели бинарного выбора в R  Временные ряды  Эндогенность  Временные ряды и эндогенность в R  Дополнительные главы эконометрики   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4102');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (189, 'Организационное поведение
', 'online.edu.ru', '   Неделя 1.   Поведение человека в организации: основные виды.  Неделя 2.  Личность в организации: психологические характеристики.  Неделя 3.  Личность в организации: психические состояния и процессы восприятия.  Неделя 4.  Ценности и установки работников в организации.  Неделя 5.  Группы в организации.  Неделя 6.  Лидерство в организации.  Неделя 7.  Власть и влияние в организации.  Неделя 8.  Организационная культура.  Неделя 9.  Практики управления человеческими ресурсами в организации и поведение сотрудников.  Неделя 10.  Влияние социальной макросреды на формирование организационного поведения.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4104');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (190, 'Психология коммуникации
', 'online.edu.ru', '   Как устроена коммуникация? Коммуникативная психология  Как можно говорить без слов? Невербальная коммуникация  Поверьте мне, я прав! Убеждающая коммуникация  Как провести интервью? Исследование, оценки, терапия  Как договориться друг с другом? Переговоры  Две головы лучше, чем одна? Групповая дискуссия. Часть 1  Две головы лучше, чем одна? Групповая дискуссия. Часть 2  Как компьютер помогает в общении? Коммуникация в сети  Как развивать коммуникативные навыки? Обучение коммуникации  Свободное изучение материалов курса и подготовка к экзамену   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4106');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (191, 'Экономика общественного сектора
', 'online.edu.ru', '  1. Введение. Общественный сектор как объект изучения. Рынок и государство. Провалы рынка и государственное вмешательство. Государственная собственность и государственные финансы. Масштабы государственного сектора. Экономика общественного сектора.  2. Общественные блага и критерии эффективности. Дилемма «эффективность-справедливость». Критерии эффективности. Теории справедливости и функция общественного благосостояния. Неравенство и перераспределение. Принцип «второго лучшего».  3. Общественный выбор. Правила принятия коллективных решений. Теорема о медианном избирателе. Теорема Эрроу о невозможности. Теория бюрократии. Рациональное неведение и представительная демократия. Логроллинг. Группы специальных интересов и погоня за рентой. Модель Нисканена. Изъяны государства.  4. Основы теории налогов: налоговое бремя. Доходы государства. Виды налогов. Критерии оценки налоговой системы. Перемещение налогового бремени.  5. Основы теории налогов: оптимальное налогообложение. Цели и ограничения налоговой политики. Парето-оптимальные налоговые структуры. Проблема уклонения от налогов.  6. Расходы государства. Формы государственных расходов. Сферы действия программ государственных расходов. Перемещение выгод и искажающее влияние программ государственных расходов. Социальная помощь и социальное страхование.  7. Оценка эффективности общественных расходов. Оценка затрат и результатов: критерии и виды анализа. Реальные и денежные экстерналии. Оценка издержек и выгод проекта в денежном выражении. Общественная ставка дисконтирования. Учет риска.  8. Финансирование и производство услуг в общественном секторе. Общественные расходы и производство в государственном секторе. Приватизация, контрактация, квазирынки. Государственно-частное партнерство.  9. Введение в экономику отраслей общественного сектора: образование, здравоохранение, жилищная сфера.  10. Бюджетный федерализм. Понятие федерализма. Теорема о децентрализации. Гипотеза Тибу. Доходы и расходы субфедеральных бюджетов. Межбюджетные трансферты и «эффект липучки». Федерализм, сохраняющий рынок.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4109');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (192, 'История дизайна
', 'online.edu.ru', '      Неделя    Название темы     1  Зарождение дизайна. Движение Arts and Crafts    2  Дизайн ар-нуво    3  Европейский авангардный дизайн 1910-х - 1920-х гг    4  Советский авангардный дизайн 1920-х гг    5  Предметный и графический дизайн группы De Stijl    6  Школа Баухауз и модернистский дизайн в Европе в конце 1920-х - 1930-е гг    7  Графический дизайн швейцарской школы и промышленный дизайн в США в середине XX    8  Модернистский промышленный дизайн в Европе после Второй мировой войны    9  Модернистский графический дизайн после Второй мировой войны    10  Постмодернистский промышленный дизайн (1960-1980-е гг.)    11  Постмодернистский графический дизайн (1960-1989-е гг.)    12  Современный дизайн в Европе и США    13  Современный отечественный дизайн    14  Экзаменационная неделя     ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4184');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (193, 'Сравнительная политика
', 'online.edu.ru', '  1 Как возможно сравнение? Что такое сравнительная политика? 2 Государства: одно, многие, какие? 3 Как поделить иобъединить власть? Современные способы распределения власти (разделения власти): Консоциация, корпоратизм 4 Как поделить иобъединить власть? Территориальный способ разделения (распределения) власти 5 Демократия: одна, многие, какие? 6 Выборы иполитические партии 7 Институты, режимы, практики 8 Представительство илегислатуры 9 Представительство: главы государств. 10 Кризисы иизменения, революции иреформы. 11 Войны между государствами ивойны между людьми 12Мировая политическая динамика  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4186');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (194, 'Математическая физика
', 'online.edu.ru', '   Введение.    Модуль 1. Постановка задач математической физики.   Тема 1. Моделирование физических процессов как начально- краевых и краевых задач для линейных дифференциальных уравнений в частных.   Модуль 2. Классификация уравнений в частных производных и соответствующих им задач.   Тема 2. Общие принципы классификации задач математической физики.   Модуль 3. Теория Штурма-Лиувилля. Ряды Фурье.   Тема 3. Теория Штурма-Лиувилля. Ортогональные системы функций. Ряды Фурье..   Модуль 4. Основные методы решения задач для уравнений в частных производных, связанные с представлением решения в виде ряда.   Тема 4. Метод Фурье. Метод конечных интегральных преобразований.   Модуль 5. Специальные функции.   Тема 5. Основы теории специальных функций. Цилиндрические и сферические функции. Применение специальных функций в задачах математической физики.   Модуль 6. Методы решения задач математической физики, связанные с разложением в интеграл.   Тема 6. Интеграл Фурье. Интеграл Фурье Бесселя (Ханкеля).   Модуль 7. Интегральное преобразование Лапласа.   Тема 7. Определение, основные свойства, формула обращения интегрального преобразования Лапласа. Применение при решении задач математической физики.   Модуль 8. Обобщенные функции.   Тема 8. Основы теории обобщенных функций. Обобщенные решения уравнений в частных производных. Интегральные преоразования с обобщенными функциями.   Итоговая аттестация.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4192');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (195, 'Минеральные ресурсы в истории Земли и их роль в развитии цивилизации
', 'online.edu.ru', ' Курс состоит из 16 лекций. 1 - В первой изложены основные понятия учения о полезных ископаемых. 2/3- Вторая и третья лекции посвящены древним и средневековым (раннее средневековье и эпоха Возрождения) периодам развития горнорудного производства. 3- В лекциях 4 и 5 охарактеризован этап железо-угольного ренесанса (19 в). Мировые золотые лихорадки , Зарождение производства агрохимических руд и соляного промысла. В лекциях 6 -9 дан анализ этапа Великих открытий: 6 - Аэрокосмическая и радио-электронная эра. XX в (алюминий, полиметаллы); 7- Атомная энергетика – фундамент развития цивилизации XXI-XXII в. 8- Стратегические ресурсы – редкие и редкоземельные элементы; 9 - Золото, серебро и платиноиды в истории цивилизации. 10- Гидроминеральные ресурсы 11- Руды океана (черные курильщики, кобальтоносные железо-марганцевые корки и конкреции) 12 - рудные и угленефтегазовые ресурсы – главные мировые конфликты 20- 21 веков. 13 -14 - Горные породы, минералы и руды в современном искусстве (Коллекционирование минеральных видов, камнесамоцветные провинции, геоморфологические уникальные формы природных образований, природная камнеграфия, искусство суйсеки, Ювелирное дело, Синтез кристаллов для воспроизводства минерально-сырьевой базы). 15 - Драгоценные металлы и Золотой миф. 16 - Платиноиды и серебро в истории цивилизации. ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4202');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (196, 'Биофизика: от неживого к живому, от принципов к механизмам
', 'online.edu.ru', ' Курс в значительной степени нестандартен, обращен к фундаментальным проблемам Жизни на Земле и во Вселенной, посвящён анализу взаимосвязи живого и неживого в природе в представлениях «сквозной эволюции» с позиций физики. Излагается современный взгляд на то, как на Земле возникла и эволюционировала жизнь, как фундаментальные закономерности неживой природы трансформировались в уникальные структуры и механизмы функционирования живых систем. Обсуждается, в чем состоят специфические физические, физико-химические и биологические отличия неживых и живых форм движения материи. Особое внимание уделено проблемам преобразования энергии, вещества и информации в живых системах, пространственно-временной самоорганизации в диссипативных системах (преимущественно, в активных средах), проблемам симметрии и иерархичности живых систем, молекулярным машинам как уникальным преобразователям энергии, вещества и информации в клетках, проблемам эволюционизма. Каждому разделу лекции (в некоторых случаях целой лекции) предпослана аннотация и вопросы на усвоение материала, а также вопрос общенаучного плана. ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4204');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (197, 'Возвышение Москвы. XIV – XV вв.
', 'online.edu.ru', ' Курс лекций "Возвышение Москвы. XIV - XV вв." предназначен как для студентов-историков, так и для всех интересующихся отечественной историей. В центре внимания лектора - известного специалиста по истории средневековой Руси, профессора Исторического факультета МГУ Н.С. Борисова - находится процесс объединения русских земель вокруг Москвы. На основе подлинных исторических источников (летописей, актового материала, памятников агиографии и т.д.) раскрываются как объективные, так и субъективные факторы, предопределившие успех московских князей в деле "собирания Руси". Ход объединительного процесса показан в неразрывной связи с борьбой русского народа за освобождение от ордынского владычества. Особое внимание уделяется таким знаковым событиям отечественной истории как Бортеневская битва, битва на реке Воже, Куликовская битва и "стояние на Угре". Дается авторская оценка различным дискуссионным утверждениям современной историографии и публицистики. Характерной особенностью курса является интерес к деятельности и личным качествам замечательных людей той эпохи - Ивана Калиты, Дмитрия Донского, Сергия Радонежского, Ивана III и других. При подготовке курса использовался разнообразный изобразительный материал. ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=4206');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (200, 'Теория кодирования
', 'online.edu.ru', '   Алфавитное кодирование. Достаточные условия однозначности декодирования: равномерность, префиксность, суффиксность. Распознавание однозначности: критерий Маркова. Оценка длины неоднозначно декодируемого слова.  Неравенство Крафта—Макмиллана; существование префиксного кода с заданным набором длин слов; следствие об универсальности префиксных кодов.  Коды с минимальной избыточностью: постановка задачи, теорема Хаффмана о редукции.  Задача исправления и обнаружения ошибок. Геометрическая интерпретация. Типы ошибок. Метрики Хемминга и Левенштейна. Кодовое расстояние. Основные задачи теории кодов, исправляющих ошибки.  Коды Варшамова—Тененгольца, алгоритмы исправления одиночных ошибок выпадения и вставки символов.  Простейшие границы для параметров кодов, исправляющих ошибки замещения: границы сферической упаковки, Синглтона, Плоткина.  Вложение метрических пространств. Лемма о числе векторов в евклидовом пространстве. Граница Элайеса—Бассалыго.  Линейные коды. Определения. Порождающая и проверочная матрицы. Связь кодового расстояния с проверочной матрицей. Граница Варшамова—Гилберта. Систематическое кодирование. Декодирование по синдрому. Коды Хемминга.  Остаточный код. Граница Грайсмера—Соломона—Штиффлера.  Сложность задачи декодирования линейных кодов: задача NCP (задачи о ближайшем кодовом слове).  Коды Рида—Соломона. Алгоритм декодирования Берлекэмпа—Велча.  Коды Рида—Маллера: кодовое расстояние, алгоритм мажоритарного декодирования.  Варианты обобщений конструкции Рида—Маллера. Лемма Липтона—ДеМилло—Шварца—Зиппеля. Понятие об алгеброгеометрических кодах.  Графы-расширители. Вероятностное доказательство существования расширителей. Коды на основе двудольных графов. Кодовое расстояние кодов на основе расширителей. Алгоритм декодирования Сипсера—Спилмана.  Теоремы Шеннона для вероятностной модели канали.  Приложения кодов, исправляющих ошибки. Рандомизированный протокол в коммуникационной сложности. Криптосхема Мак-Элиса. Однородные (псевдослучайные) множества на основе кодов, их приложения к дерандомизации в задаче MAX-SAT.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=63263');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (201, 'Онлайн-технологии в обучении
', 'online.edu.ru', ' Данный курс это:
1.Путеводитель по миру онлайн-курсов, одному из, если не самому обсуждаемому явлению в образовательном мире сегодня. Как у любого нововведения у них есть достоинства и недостатки. Национальный исследовательский Томский государственный университет разрабатывает МООК с 2014 года и предлагает их на таких платформах, как Национальная платформа Открытое образование, Coursera, Лекториум, Stepik, Образование на русском. Курс «Онлайн-технологии в обучении» позволит Вам сформировать представление о МООК, основанное на своём личном опыте.
2. Библиотека полезных онлайн-ресурсов, которые помогут вам эффективно работать с документами, красочно презентовать свой материал, работать с аудиторией в режиме реального времени, планировать встречи и реализовать любые свои задумки.
Программа курса:
1. Знакомимся с онлайн-технологиями
2. Эффективно обучаемся на онлайн-курсах
3. Включаем онлайн-курсы в свою учебу ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=65934');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (202, 'Теория вероятностей – наука о случайности
', 'online.edu.ru', ' Понятие вероятности становится необходимым рациональным инструментом ориентации в современном мире полном неопределенности. Касается ли это проблем бизнеса, управления, науки, повседневной жизни, нам, как правило, приходится принимать решения в условиях риска и неопределенности. Вообще говоря, теорию вероятностей можно рассматривать как математическую модель интуитивного понятия неопределенности. Курс является введением в элементарную теорию вероятностей и снабжен многочисленными примерами  разной степени сложности, часто взятыми из жизни, показывающими как строятся вероятностные модели. Даются англоязычные аналоги основных терминов. ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=65936');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (203, 'Гомер глазами филолога
', 'online.edu.ru', '   Тема 1. Контекст: исторический, культурологический, историко-литературный   Тема2. Гомеровский вопрос. Устная теория. Гомер и формулы   Тема 3.  Гомеровские поэмы и типология героического эпоса   Тема 4. Структура и композиция поэм. Гомеровские сравнения   Тема 5.  Гекзаметр: метрика поэм Гомера, их переводов и подражаний   Тема 6.  Гомеровская мифология и ее основания   Тема 7.  Гомеровская текстология. Рецепция Гомера в античности   Тема 8.  Гомер в культуре последующих эпох. Русский Гомер   Тема 9.  Гомер глазами современных ученых  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=120512');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (204, 'Культурология
', 'online.edu.ru', '   Неделя 1.  История понятия «культура». Культура в системе понятий.     Основные этапы истории понятия «культура»;  Типология повседневного употребления слова «культура»;  Типология повседневного употребления слова «культура» (продолжение);  Научно-философское использование термина «культура»;  Научно-философское использование термина «культура» (продолжение);  Многозначность современных определений культуры.    Неделя 2.  Становление научно-исследовательской проблематики культуры в структуре современного научного знания.       Основные этапы формирования проблематики культуры;  Трансформация моделей исторического времени;  Основные характеристики общества модерна;  Генезис общества модерна и роль факторов культуры;  Генезис общества модерна и роль факторов культуры (продолжение);  Идеи культуры в эпоху Просвещения и в XIX веке («веке историзма»);  Причины формирования историзма и исторического сознания;  Появление исследовательского интереса к изучению национальной истории культуры и культур других народов;  Формирование современных институтов культуры.    Неделя 3.  Классические редукционистские теории культуры       Определение редукционизма;  Марксизм: экономический редукционизм;  Влияние марксизма на современные теории культуры;  Позитивизм: методологический редукционизм;  Философия жизни Фридриха Ницше;  Психоанализ Зигмунда Фрейда;  Эрнст Кассирер о редукционистских теориях культуры    Неделя 4.  Классические нередукционистские теории культуры       Общая характеристика нередукционистских теорий культуры;  История герменевтики письменных текстов;  Методология исторического познания: Иоганн Густав Дройзен;  Методология исторического познания: Иоганн Густав Дройзен (продолжение);  Теория «наук о духе»: Вильгельм Дильтей;  «Науки о культуре» в неокантианстве: Вильгельм Виндельбанд и Генрих Риккерт;  Понимающая социология Макса Вебера.    Неделя 5.  Культурная антропология.       Культурная антропология: наименования, определения, начало формирования как научной дисциплины;  Ранние теории культурной антропологии: Эволюционизм; Диффузионизм; Цивилизационные теории;  Основоположники и ключевые идеи классической антропологии;  Культурная антропология сегодня – от изучения «примитивных обществ» к антропологии собственной культуры;  Пример исследовательского проекта: антропология «распределенного образа жизни»;  Структура и методология исследования.    Неделя 6.  Лингвистический поворот в исследованиях культуры. Проблема смысла       Лингвистический поворот: философия (аналитическая философия языка), лингвистика, семиотика, структурализм, история (историческая семантика), исследования культуры;  Базовые концепции смысла в гуманитарных науках;  Основы семиотики: три аспекта знаковых систем, типология знаков;  Основные семантические модели;  Смысл как перспектива предмета;  Смысл как интенциональная структура сознания;  Феноменология в современных исследованиях культуры;  Самостоятельная роль знакового выражения;  Интерпретативная культурная антропология.    Неделя 7.  Современные программы исследования культуры       История понятий и дискурс-анализ;  Иконический поворот и визуальные исследования;  Постколониальные теории и исследования городской культуры;  Исследования медиа.    Неделя 8.  Массовая культура       Отрицательная оценка массовой культуры;  Массовая или народная? Произведение искусства в эпоху технической воспроизводимости;  Изменение медиа-среды и ее значение для трансформации современной культуры.    Неделя 9.  Городская культура       Горожанин и публичные пространства;  Современный город как культурное явление.    Неделя 10.  История и культура. Феномен историзма       Трансформация структуры времени в современных обществах: «сокращение пребывания в настоящем» (философия культуры Германа Люббе);  Культурная память;  Музеи и музеефикация культуры.    Неделя 11.  Культурная политика       Культурная революция в СССР;  Специфика советской культурной политики;  Основные современные модели культурной политики.    Неделя 12.  Культура, экономика, общество       Исследовательская программа британских Cultural Studies;  Постколониальные исследования;  Гендерные исследования.     ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=120514');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (205, 'История рекламных инструментов
', 'online.edu.ru', '   Введение. Зачем нужны рекламные инструменты?  Основы рекламного языка: части 1 и 2. Текст, изображение и слоган. Плакат и рекламное объявление.  Роль женщин и искусства в формировании брендов  Реклама как экономический и культурный феномен  Креативная революция. Идея в центре коммуникации  Креативные директора и их приемы  Господство телевидения. Сторителлинг и жанры  Национальные школы рекламы. Фестивали и эффективность  Вовлечение аудитории в эпоху интернета. Факторы цепкости  Контент, контекст и польза. Построение интерактивных платформ   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=121723');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (206, 'Трудовое право России
', 'online.edu.ru', '  Программа курса состоит из 14 тем, в рамках каждой из которых будет рассмотрено несколько разделов.   1. Понятие, предмет, метод и система трудового права.    Современное состояние трудового права  Предмет трудового права  Метод трудового права  Система трудового права    2. Принципы трудового права     Понятие и значение принципов трудового права  Отраслевые принципы трудового права  Недопущение дискриминации в сфере труда  Запрет принудительного труда    3. Источники трудового права    Понятие источников трудового права  Иерархия источников трудововго права  Конституция и международные акты как источники трудового права  Трудовой кодекс РФ и иные федеральные законы  Иные акты как источники трудового права    4. Правоотношения в сфере трудового права. Субъекты трудового права     Правоотношения в сфере трудового права  Трудовое правоотношение  Иные отношения, тесно связанные с трудовыми  Понятие и виды субъектов трудового права  Работодатель как субъект трудового права  Работник как субъект трудововго права    5. Права профсоюзов и объединений работодателей в сфере труда. Социальное партнерство     Профсоюз. Правовоые основы создания и деятельности  Права прособзов и гарантии их деятельности  Объединения работодателей. Права и обязанности  Социальное пратнерство. Понятие и система социального партнерства  Принципы, уровни, формы, акты и органы социального партнерства  Коллективные переговоры. Коллективные договоры и соглашения  Участие работников в управлении организацией  Ответственность сторон социального партнерства    6. Трудовой договор     Значение трудового договора  Понятие трудового договора  Заключение трудового договора  Виды трудового договора  Изменение трудового договора  Прекращение трудового договора    7. Рабочее время и время отдыха     Понятие и виды рабочего времени  Режим рабочего времени  Понятие и виды времени отдыха    8. Оплата и нормирование труда     Понятие и содержание заработной платы  Функции заработной платы  Признаки заработной платы  Правовое регулирование заработной платы  Системы оплаты труда  Нормирование труда    9. Гарантии и компенсации     Гарантии и компенсации в системе трудового законодательства  Гарантии и компенсации при направлении работников в служебные командировки  Гарантии и компенсации работникам, совмещающим работу с получением образования  Гарантии работникам, связанные с расторжением трудового договора  Другие гарантии и компенсации    10. Дисциплина труда и дисциплинарная ответственность     Дисциплина труда – общие положения  Обеспечение дисциплины труда. Поощрение и убеждение  Нарушения и взыскания  Общие дисциплинарные основания увольнения  Специальные дисциплинарные основания увольнения  Порядок применения дисциплинарных взысканий    11. Материальная ответственность сторон трудового договора     Понятие и виды материальной ответственности. Материальная ответственность работодателя  Материальная ответственность работника  Порядок определения размера и взыскания ущерба  Возмещение затрат, связанных с обучением работника    12. Трудовые споры, порядок их рассмотрения и разрешения     Индивидуальные и коллективные трудовые споры  Разрешение индивидуальных трудовых споров в комиссии и по трудовым спорам  Разрешение индивидуальных трудовых споров в суде  Возбуждение коллективного трудового спора и разрешение его с использованием примирительных процедур  Основания и порядок проведения забастовки    13. Защита трудовых прав и свобод     Общий обзор способов защиты  Самозащита работниками трудовых прав  Защита прав и интересов работников профессиональными союзами  Государственный контроль (надзор)    14. Международно-правовое регулирование труда     Поиск информации  Причины возникновения и основные исторические этапы развития МПРТ  Международная организация труда (МОТ)  Акты МОТ  Иные международные акты и процедуры  Современные проблемы международного трудового права   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123250');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (207, 'Финансовые технологии
', 'online.edu.ru', '    Тема 1.   Сущность инновационных финансовых технологий: предпосылки возникновения и экономическое содержание    Тема 2.   Информационные технологии в финансовой сфере    Тема 3.   Криптовалюты    Тема 4.   Финансовые двусторонние платформы: выгоды и риски для операторов, потребителей и общества    Тема 5.   Нефинансовые компании на рынке финансовых услуг: ритейлеры, операторы связи, социальные сети    Тема 6.   Факторы успеха и провала на рынке финтех-услуг    Тема 7.   Оценка экономической эффективности финтех-компаний и финтех-проектов    Тема 8.   Риски инновационных финансовых технологий для традиционных финансовых организаций    Тема 9.   Модели интеграции инновационных финансовых технологий в деятельность традиционных финансовых организаций    Тема 10.   Современное состояние рынка и перспективы использования инновационных финансовых технологий в России  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123251');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (208, 'R для лингвистов: программирование и анализ данных
', 'online.edu.ru', '  1. Введение в R: основные элементы, функции, циклы 2. Продвинутая обработка данных: пакеты tidyr и dplyr 3. Работа со строками: строки в R, регулярные выражения 4. Визуализация данных: base R vs. ggplot2 5. Интерактивная визуализация: rmarkdown, plotly, lingtypology 6. Работа с текстами: пакет tidytext 7. Введение в статистику: основы фриквентисткой статистики, формулировка гипотез 8. Корреляция и линейная регрессия 9. Кластеризация 10. Логистическая регрессия  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123252');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (209, 'Поведение потребителей в культурном туризме
', 'online.edu.ru', '    Неделя 1   – Введение в поведение потребителей    Неделя 2    –  Введение в туризм: основные тренды    Неделя 3    –  Культурный туризм    Неделя 4    –  Внутренние факторы влияния на поведение потребителя в культурном туризме    Неделя 5    –  Внешние факторы влияния на поведение потребителя в культурном туризме    Неделя 6    –  Подходы к изучению потребительского поведения в культурном туризме    Неделя 7    –  Маркетинговые средства коммуникации в культурном туризме    Неделя 8    –  Управление потребительским поведением в культурном туризме    Неделя 9    –  Потребительское поведение в нишевом туризме: Креативный туризм    Неделя 10    –  Потребительское поведение в нишевом туризме: Кинотуризм  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123253');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (210, 'Публичная политика и права человека
', 'online.edu.ru', '  Программа курса  Тема 1. Понятие публичной политики  Тема 2. Изучение публичной политики: зарубежный опыт  Тема 3. Концепция прав человека (появление и развитие)  Тема 4. Права человека и право. Поколения прав человека  Тема 5. Концепция прав человека: некоторые нерешенные проблемы и противоречия  Тема 6. Международная система защиты прав человека  Тема 7. Институционализация прав человека в современной России  Тема 8.Изучение публичной политики: Российский опыт  Тема 9. Институты-медиаторы как важный компонент развития публичной политики  Тема 10. Эксперты и власть. Роль академического сообщества в развитии публичной политики.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123254');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (211, 'Современное искусство
', 'online.edu.ru', '      Введение в искусство XX-XXI веков. Обзорная лекция      Истоки авангарда. Гоген. Сезанн. Примитивизм. Фовизм. Парижская школа      Кубизм. Пикассо. Орфизм. Экспрессионизм. Зарождение абстракции. Пит Мондриан. Баухауз      Итальянский футуризм. Русский авангард. Конструктивизм      Дадаизм и Сюрреализм      Искусство между двумя войнами. Новая вещественность. АХР и ОСТ. Соцреализм      Американское искусство первой половины ХХ века. Послевоенное американское искусство      Послевоенное искусство Европы. Новый реализм. Группа Zero. Минимализм в американском искусстве      Неоавангард (США). Концептуализм, лэнд-арт. Арте-повера (Италия). Поп-арт      Неодада. «Флуксус», Ситуационистский интернационал. Искусство действия. Хэппенинг, боди-арт, перформанс      Советское неофициальное искусство. Лианозовская школа, московский романтический концептуализм, соц-арт. Московский акционизм      Видео-арт, технологическое искусство. Science art      Неоэкспрессионизм. Граффитизм (США). Трансавангард (Италия). «Новые дикие» (Германия)      Неопоп-арт. Постмодернизм      Искусство рубежа XX-XXI веков. Социальное искусство. «Архив лихорадка»      ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123255');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (226, 'Азбука медицинских теорий
', 'online.edu.ru', '  А. Авторское введение. Б. Борьба идей в древней медицине. В. Вклад герметизма в практическую медицину. Г. Где заканчивается медицина и начинается искусство врачевания? Д. Духовное движение в медицине (Аюрведа). Е. Если бы не было античной медицины, то врачи не были бы философами. Ж. Жизненная сила. З. Загрузка новейшей медицины – теория и практика. И. Искусство и медицина. К. Консультация Чехова. Л. Литературные образы в медицине. М. Мастер Леонардо и медицина.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131810');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (227, 'Нейрофизиология поведения
', 'online.edu.ru', '   Тема 1 . Основные функциональные блоки мозга человека (потребности, память, принятие решений, движения и др.). Общие принципы работы сенсорных систем: кодировка количества и качества, топические отношения, алгоритмы обработки сигналов в ЦНС.   Тема 2 . Мозг и сенсорные системы: зрение. Глаз, фоторецепторы (палочки, колбочки) и сетчатка. Анализ зрительной информации в ЦНС: распознавание образов разной степени сложности. Бинокулярное зрение. Протезирование зрения.   Тема 3 . Мозг и сенсорные системы: слух и равновесие. Волосковые рецепторы внутреннего уха. Принципы работы вестибулярной системы. Среднее ухо, улитка и слуховые центры головного мозга. Распознавание речи и музыки. Протезирование слуха.   Тема 4 . Мозг и сенсорные системы: вкус и обоняние. Разнообразие вкусовых рецепторов и их функции. Вкусовые области ЦНС. Разнообразие обонятельных рецепторов. Обоняние в головном мозге. Целостный вкусовой образ: вклад обоняния и кожной чувствительности.   Тема 5 . Мозг и сенсорные системы: болевая чувствительность. Боль как реакция на повреждение клеток и тканей. Передача боли в ЦНС. Системы контроля боли; наркотические и ненаркотические анальгетики. Боль и стресс. Патология боли.   Тема 6 . Мозг и потребности: любопытство, свобода, радость движений. Значимость новой информации для организации поведения. Центры исследовательской мотивации: от среднего мозга до коры больших полушарий и речевой модели внешнего мира.   Тема 7 . Мозг и потребности: самосохранение, защита территории, стремление лидировать. Роль миндалины. Конкуренция пассивных («страх») и активных («агрессия») оборонительных программ. Агрессия как универсальная реакция на конфликт интересов.   Тема 8 . Мозг и потребности: двигательное подражание и сопереживание. Открытие зеркальных нейронов. Подражание моторным программам и алгоритмам поведения как основа передачи культурных навыков. Эмоциональное подражание, сопереживание.   Тема 9 . Мозг и память: ассоциативное и неассоциативное обучение. Классический условный рефлекс. Суммация и ее синаптические механизмы. Долговременная потенциация; роль гиппокампа. Импринтинг как особый тип долговременной памяти.   Тема 10 . Молекулярные основы ассоциативного обучения; методы их исследования (ЭЭГ, оптогенетика). Условное торможение как «отрицательное обучение», темпераменты. Условные рефлексы на комплексные стимулы; речевые системы мозга.   Тема 11 . Мозг и движения: рефлексы и локомоция. Моно- и полисинаптические рефлексы спинного мозга, их функциональный смысл. Шаг и бег как основные варианты локомоции человека. Головной мозг и управление локомоцией (тоническое и фазическое).   Тема 12 . Мозг и движения: произвольные и автоматизированные моторные акты, пирамидная система. Роль премоторной и моторной коры. Вклад мозжечка, базальных ганглиев, субталамуса, таламуса. Двигательная память как «торможение торможения».  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131811');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (212, 'Современный культурный процесс
', 'online.edu.ru', '     № недели  Тема лекции     1     Что такое современность       2     Субъект и субъективность в эпоху современности       3     Историзация культуры       4     Политика и культура       5     Современное искусство       6     Университетская культура       7     Потребление и культура       8     Культурные процессы в современной России       9     Эпоха модерна и становление массовой культуры       10     Массовая культура и развитие массмедиа       11     Тоталитарное государство, культура и массовое общество       12     Массовая культура в эпоху постмодерна       13     Культурная политика как инструмент урбанистической регенерации       14     Институты современной культурной дипломатии       15     Кибернетика и контр-культура       16     Влияние big data на культуру и познание       ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123256');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (213, 'Основы права
', 'online.edu.ru', '   Что такое право?  Российское право на правовой карте мира  Взаимная ответственность государства и гражданина  Брак и семья  Что может и чего не может право? Предмет правового регулирования. Источники права  Его Величество Закон. Нормотворчество. Система права  Трудовые правоотношения  Как работает право? Механизм правового регулирования. Нормы права. Правоотношения  Гражданское право. Собственность и имущественные отношения  Если кое-кто у нас… Правонарушения и юридическая ответственность  Как и за что могут наказать. Административная и уголовная ответственность   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123257');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (214, 'Прикладной статистический анализ
', 'online.edu.ru', '  Неделя 1. Базовые понятия и задачи статистики  Неделя 2. Сведения из теории вероятностей для построения статистических моделей  Неделя 3. Оценивание параметров в практике статистического анализа  Неделя 4. Статистическая проверка гипотез и ее приложения  Неделя 5. Характеристики многомерной совокупности. Меры взаимосвязи признаков  Неделя 6. Регрессионный анализ: элементы теории и практические приложения  Неделя 7. Параметрическое и непараметрическое моделирование распределений  Неделя 8. Выделение однородных групп объектов методами классификации  Неделя 9. Снижение размерности признакового пространства и построение индексов  Неделя 10. Модели времменных рядов и их применение  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123258');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (215, 'Микроэкономика: промежуточный уровень
', 'online.edu.ru', '  В рамках курса будут рассмотрены следующие темы:   Теория поведения потребителя  Экономика обмена  Теория выбора в условиях неопределенности  Теория поведения производителя  Экономика с производством   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123259');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (216, 'Моделирование процессов и систем. Нелинейные динамические системы
', 'online.edu.ru', '  Неделя 1.Основные понятия теории динамических систем.  Неделя 2. Одномерные динамические системы.  Неделя 3. Локальные бифуркации в одномерных динамических системах.  Неделя 4. Двумерные динамические системы. Часть I.  Неделя 5. Двумерные динамические системы. Часть II.  Неделя 6. Предельные циклы.  Неделя 7. Бифуркации в двумерных динамических системах.  Неделя 8. Динамические системы в пространстве. Элементы теории хаоса. Часть I.  Неделя 9. Динамические системы в пространстве. Элементы теории хаоса. Часть II.  Неделя 10.Критерии хаоса. Часть I.  Неделя 11. Критерии хаоса. Часть II.  Неделя 12. Масштабно-инвариантные случайные процессы.  Неделя 13. Анализ фрактальных временных рядов.  Неделя 14. Анализ реконструкций аттрактора по наблюдаемому временному ряду.  Неделя 15.Нелинейная динамика микроблоггинговой социальной сети.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123460');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (217, 'История и культура Урала
', 'online.edu.ru', '   Пера маа - дальняя земля на Востоке  Прикамье - древняя солонка России. Древние столицы Урала: Соликамск - соль камская  Деревянное зодчество Урала  Строгановская цивилизация  Прикамье - ключи к Сибири. Тайны похода Ермака  Дороги в Сибирь. Чусовая – река теснин  Уральская горнозаводская цивилизация. Города-заводы Прикамья  Из недр уральских гор: алмазная, золотая, платиновые лихорадки на Урале  XIX век на Урале  Благотворительность и меценатство на Урале   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=123461');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (218, 'Психология
', 'online.edu.ru', '   НЕДЕЛЯ 1:  История и методология психологии   НЕДЕЛЯ 2:  Познавательные процессы: Ощущение, восприятие, внимание   НЕДЕЛЯ 3:  Познавательные процессы: Память   НЕДЕЛЯ 4:  Познавательные процессы: Мышление   НЕДЕЛЯ 5:  Мотивация   НЕДЕЛЯ 6:  Эмоции   НЕДЕЛЯ 7:  Подходы к пониманию личности. Часть 1.   НЕДЕЛЯ 8:  Подходы к пониманию личности. Часть 2.   НЕДЕЛЯ 9:  Психология индивидуальных различий. Часть 1.   НЕДЕЛЯ 10:  Психология индивидуальных различий. Часть 2.   НЕДЕЛЯ 11:  Психология развития   НЕДЕЛЯ 12:  Человек в обществе   НЕДЕЛЯ 13:  Человек в группе   НЕДЕЛЯ 14:  Прикладная психология: психология в организации   НЕДЕЛЯ 15:  Прикладная психология: решение практических проблем и задач   НЕДЕЛЯ 16:  Психология в междисциплинарном пространстве: психофизиология и психогенетика  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=126921');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (219, 'Риск-менеджмент
', 'online.edu.ru', '  Тема 1. Риск и неопределенность.  Тема 2. Риск, доходность и стоимость активов компании.  Тема 3. Интегрированное управление рисками в компании.  Тема 4. Диагностика рисков.  Тема 5. Методы измерения рисков.  Тема 6. Стресс-анализ компании.  Тема 7. Метрики риска.  Тема 8. Система элиминирования рисков.  Тема 9. Управление финансовыми рисками компании.  Тема 10.Управление нефинансовыми рисками компании.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=126922');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (220, 'Управление проектами
', 'online.edu.ru', '  Неделя 1. Системный подход в управлении проектами Неделя 2. Система управления проектами в компании Неделя 3. Процессы и функциональные области управления проектами Неделя 4. Определение и предметная область проекта Неделя 5. Управление командой проекта Неделя 6. Планирование проекта по временным и стоимостным параметрам Неделя 7. Управление качеством проекта Неделя 8. Управление рисками проекта Неделя 9. Управление коммуникациями и стейкхолдерами Неделя 10. Оценка исполнения проекта Неделя 11. Гибкое управление проектами Неделя 12. Стандарты управления проектами. Корпоративная система УП  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=126923');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (221, 'Экстраординарные сделки в хозяйственных обществах
', 'online.edu.ru', '   Тема 1. Экстраординарные сделки и существенные корпоративные действия как объекты особого правового режима   Темы 2-4. Порядок совершения крупных сделок   Темы 5-7.  Порядок совершения сделок с заинтересованностью. Судебная практика и практические проблемы   Темы 8.  Особый порядок совершения сделок, который может бытьпредусмотрен уставом   Темы 9-10.  Защита нарушенных прав при совершении экстраординарных сделок  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=126924');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (222, 'Социальная психология
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=126925');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (223, 'Статистические методы в управлении инновациями
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Раздел 1. Использование дескриптивной статистики и корреляционно-регрессионного анализа в принятии управленческих решений   Неделя 1. Статистическая наука: формирование, основные категории и показатели. Формирование статической науки. Основные категории статистики. Статистические показатели: абсолютные и относительные. Понятие и этапы статистического анализа. Статистический прогноз. Статистические данные: пространственные, временные, панельные. Основные принципы визуализации статистических данных (разбор примеров).  Неделя 2. Основные показатели дескриптивной статистики, их определение и интерпретация: средняя арифметическая простая и взвешенная; показатели вариации: размах, дисперсия, среднеквадратическое отклонение, коэффициент вариации.  Неделя 3. Временные ряды: компоненты временного ряда; показатели изменения уровней временного ряда; тенденция временного ряда.  Неделя 4. Регрессионный анализ. Коэффициент парной линейной корреляции. Парная линейная регрессий (постановка задачи, интерпретация, разбор примеров). Множественный регрессионный анализ (постановка задачи, интерпретация, разбор примеров).  Неделя 5. Принятие решений на основе статистических данных: общая концепция, разбор примеров.   Раздел 2. Основы статистики инноваций и интеллектуальной собственности   Неделя 6. Развитие статистики инноваций в России (по материалам Росстата) и за рубежом (Руководство Осло). Методологические основы сбора и анализа данных об инновационной деятельности и инновациях.  Неделя 7. Методические основы сбора статистических данных об инновациях в РФ.  Неделя 8. Система показателей статистики науки и инноваций (по материалам ЕМИСС).  Неделя 9. Система статистических показателей результатов интеллектуальной деятельности (по материалам Роспатента и ВОИС).  Неделя 10. Экзамен.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131070');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (224, 'Трехмерное моделирование
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Начало работы 2. Создание простых объектов 3. Сплайны 4. Введение в полигональное моделирование 5. Полигональное моделирование 6. Симуляции 7. Плагины  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131071');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (225, 'История России
', 'online.edu.ru', '  1. Древняя Русь.  2. Русь и монголы. Московская Русь.  3. Русское государство в конце XV – XVI веках.  4. Смута на Руси.  5. Россия в XVIII веке.  6. Россия в первой половине XIX века.  7. Россия во второй половине XIX века.  8. Россия в начале XX века.  9. Русская революция 1917 года и Гражданская война.  10. Россия в годы новой экономической политики. 1921-1929 гг.  11. СССР в 1930-е – 1940-е годы.  12. СССР в годы Великой Отечественной войны.  13. Внешняя и внутренняя политика СССР во второй половине XX века.  14. Политическая жизнь России.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131074');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (228, 'Молекулярная генетика развития растений
', 'online.edu.ru', '  Лекция 1. Вводная. Модельные объекты и геномы. Лекция 2. Трансформация растений. Лекция 3. Методы исследования и создание растений-ГМО. Лекция 4. Позиционный контроль развития. Лекция 5. Эмбриональное развитие. Лекция 6. Функционирование апикальных меристем. Лекция 7. Морфогенез листа. Лекция 8. Дифференцировка клеток эпидермиса. Лекция 9. Морфогенез цветка I. Индукция цветения. Лекция 10. Морфогенез цветка II. ABCDE-модель развития цветка. Лекция 11. Биология опыления растений. Самонесовместимость. Лекция 12. Развитие семязачатков и плодов.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131812');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (229, 'Земля - планета океанов
', 'online.edu.ru', '  Тема 1. Происхождение воды на Земле Тема 2. История открытия Мирового океана Тема 3. Состав и свойства океанской воды Тема 4. Общая циркуляция вод океанов Тема 5. Волновые движения в океанах Тема 6. Стихийные бедствия в океанах Тема 7. Рельеф дна океанов Тема 8. Биология океана, морские экосистемы и биологические ресурсы Тема 9. Осадконакопление в океанах Тема 10. Гидротермальные постройки и полезные ископаемые Тема 11. Перспективы изучения океанов и главные проблемы океанологии  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131813');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (230, 'Суперкомпьютеры  и параллельная обработка данных
', 'online.edu.ru', '  Данный курс состоит из пяти основных разделов: 1. Введение в предмет. 2. Архитектура параллельных вычислительных систем. 3. Технологии параллельного программирования. 4. Методы построения и оценки качества параллельных вычислительных систем и программ. 5. Введение в теорию анализа структуры программ и алгоритмов.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131814');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (231, 'Базовый курс методики обучения иностранным языкам
', 'online.edu.ru', '   Тема 1 . Основные понятия и категории методики преподавания иностранных языков  Тема 2.  Принципы и средства обучения иностранному языку  Тема 3.  Обучение аудированию  Тема 4 . Обучение чтению  Тема 5.  Обучение письменной речи  Тема 6.  Обучение говорению  Тема 7.  Планирование и урок иностранного языка  Тема 8.  Проектная деятельность образовательного учреждения  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=131815');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (232, '«Онлайн-формат: обучение через всю жизнь
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=136073');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (233, '«Информатика. Часть 1: Теоретические разделы»
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=136074');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (234, 'Экономика
', 'online.edu.ru', '  1 Введение вэкономическую теорию 2 Спрос ипредложение (1) 3 Спрос ипредложение (2) 4 Производство ииздержки 5 Типы рынков 6 Введение вмакроэкономику 7 Основные макроэкономические показатели 8 Экономический рост ицикл 9Монетарная ифискальная политики (1) 10Монетарная ифискальная политики (2). Открытая экономика 10 Итоговый тест  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=139407');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (235, 'Введение в историю искусства
', 'online.edu.ru', '   Тема 1.  Искусство Древнего мира (часть 1)  Тема 2. Искусство Древнего мира (часть 2)  Тема 3. Искусство Раннего Средневековья  Тема 4. Искусство Высокого Средневековья  Тема 5. Искусство 14 века  Тема 6. Искусство 15 века  Тема 7. Искусство 16 века  Тема 8. Искусство 17 века  Тема 9. Искусство 18 века  Тема 10. Искусство 19 века  Тема 11. Искусство 20 века  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=139408');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (236, 'Линейная алгебра
', 'online.edu.ru', '  1. Линейное пространство, линейный функционал 2. Базис и размерность 3. Метод Гаусса. Решение систем линейных уравнений 4. Линейные отображения. Переход к другому базису 5. Определитель матрицы. Линейный оператор 6. Замена базиса линейного оператора. Собственные векторы, собственные значения, собственный базис 7. Жорданова нормальная форма. Сжимающие отображения. Теорема Фробениуса 8. Билинейные формы. Квадратичные формы 9. Ортогонализация. Приведение формы к главным осям 10. Метод наименьших квадратов 11. Итоговый экзамен в виде теста  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=139409');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (275, 'Теория государства и права
', 'online.edu.ru', '  Тема 1. Ведение в правоведение: понятие, предмет и система юридической науки (Лекция 1. Ведение в правоведение: понятие, предмет и система юридической науки)  Тема 2. Понятие, признаки и функции государства (Лекция 2. Понятие, признаки государства; Лекция 3. Функции государства)  Тема 3. Теоретико-концептуальные подходы к пониманию государства (Лекция 4. Теории происхождения государства; Лекция 5. Типологии, концепции понимания государств)  Тема 4. Механизм государства (Лекция 6. Правовое государство, гражданское общество. Механизм государства)  Тема 5. Форма государства (Лекция 7. Формы правления, политический режим; Лекция 8. Формы государственно-территориального устройства)  Тема 6. Понятие, признаки, источники права (Лекция 9. Понятие, признаки права; Лекция 10.Источники, формы права)  Тема 7. Система права. Правовые системы современности. (Лекция 11. Система права; Лекция 12. Правовые системы современности)  Тема 8. Правоотношение, правоприменение и правопорядок (Лекция 13. Правоотношения: понятие, виды, субъекты; Лекция 14. Правоприменение и правопорядок)  Тема 9. Павонарушение, состав правонарушения, юридическая ответственность (Лекция 15. Правонарушение: понятие, виды. Состав правонарушения; Лекция 16. Юридическая ответственность: понятие, виды)  Тема 10. Основные типы правопонимания (Лекция 17. Основные типы правопонимания; Лекция 18. Правосознание. Правовая культура).  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=604953');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (237, 'Основы корпоративных финансов
', 'online.edu.ru', '  1. Цели корпорации. Потоки денежных средств корпорации 2. Ценность денег с учетом фактора времени (time value of money). Дисконтирование и приведенная стоимость. Определение фундаментальной стоимости акций и облигаций 3. Риск и доходность. Модель оценки долгосрочных активов (CAPM) 4. Критерии принятия инвестиционных решений и формирования портфеля проектов 5. Как корпорации привлекают капитал. Структура капитала компании на совершенном рынке капитала. Стоимость капитала для компании (cost of capital) 6. Структура капитала компании на несовершенном рынке: Эффект налогов и издержек банкротства (financial distress costs). Теория компромисса (Trade-off theory) 7. Структура капитала на несовершенном рынке: эффект агентских проблем и асимметричной информации. Порядок выбора источников финансирования. (Pecking order of financing) 8. Политика выплат инвесторам. Модель для совершенного рынка. Загадки дивидендов. Эффект налогов и асимметрии информации 9. Оценка стоимости компании методами дисконтирования денежных потоков 10. Стратегические сделки: слияния, поглощения, выкупы компаний, реструктуризация 11. Корпоративное управление (corporate governance) и стоимость компании 12. Итоговый экзамен  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=140091');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (257, 'Экономика минерального сырья
', 'online.edu.ru', '  Модуль 1 «Введение. Что изучает экономика минерального сырья. Основные понятия»  Модуль 2 «Рынки и цены минерального сырья»  Модуль 3 «Нефть»  Модуль 4. «Природный горючий газ»  Модуль 5. «Твердое топливо: уголь и уран»  Модуль 6. «Традиционная и альтернативная энергетика»  Модуль 7. «Черные металлы»  Модуль 8. «Цветные металлы»  Модуль 9 «Благородные металлы и алмазы»  Модуль 10 «Богатство недр – благо или наказание? Битвы за ресурсы». Заключение.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142084');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (238, 'Педагогика и психология высшей школы
', 'online.edu.ru', '   Раздел 1.   Образовательная транспектива современного российского образования   Преподаватель Костюкова Т.А.  Тема 1. Модели реформирования отечественного образования в ХХ  Тема 2. Болонский процесс и реформирование отечественного образования в нач. ХХI вв.  (Видеолекции и интервью с проректорами российских вузов – членами рабочей группы Минобрнауки РФ по вопросу Болонского соглашения, тестирование)   Раздел 2. Психология мотивации,вовлеченности и достоверности в образовательный процесс   Преподаватель Лукьянов О.В.  Тема 1 Аутентификация и идентичность  Тема 2. Мотивация и психологическая активность  (видеолекции, творческие задания на самооценку)   Раздел 3 Убеждающая коммуникация в образовательных практиках   Преподаватель Богданова Е.Л.  Тема 1. Виды и критерии конструктивности психолого-педагогического влияния.  Тема 2 Приемы организации конструктивного педагогического общения.  Тема 3. «Убеждение» как конструктивный вид психолого-педагогического влияния  (Видеолекции и инсценировки педагогических ситуаций, задания на взаимное оценивание)   Раздел 4.Аутентичное оценивание образовательных результатов   Преподаватель Абакумова Н.Н.  Тема 1. Мониторинг инновационных образовательных результатов  Тема 2 Аутентичное оценивание образовательных результатов  Преподаватель Краснорядцева О.М.  Тема 3. Рейтинговая система как предмет профессионального мышления преподавателя высшей школы.  Подтема 1. Результаты освоения учебной дисциплины: психолого-образовательный контекст.  Подтема 2. Психолого-дидактические возможности учебных заданий и рекомендации по проектированию их операционного состава  (Видеолекции, интервью и кейс, тестирование)   Раздел 5   Образовательное проектирование   Преподаватель Малкова И.Ю.  Тема 1. Проектирование как тема и направление изменения образования  Тема 2. Концепция образовательного проектирования: основные категории  (Видеолекции и кейсы, тестирование)   Раздел 6. Психологическая безопасность участников образовательного процесса   Преподаватель Щелин И.В.  Тема 1. Специфика и профилактика угроз психологической безопасности участников образовательного процесса в вузе  Подтема 1. Психологическая безопасность: угрозы психологической безопасности, формы и последствия психологического насилия во взаимодействии для студентов и педагогов.  Подтема 2. Эмоциональное выгорание педагога. Индивидуальная уязвимость участников образовательного процесса с различными акцентуациями характера.  Преподаватель Щеглова Э.А.  Тема 2. Психологические возможности и ограничения манипулятивных техник в деятельности преподавателя высшей школы  Подтема 1. Манипулирование как вид психологического воздействия.  Подтема 2. Манипуляции в условиях профессионально-педагогического общения  (Видеолекции, тесты, задания на взаимное оценивание)    Итоговое рефлексивное диагностическое тестирование.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=140092');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (239, 'Персональная эффективность: тайм-менеджмент
', 'online.edu.ru', '  1.Целеполагание.  2.Поглотители времени. Хронометраж.  3.Эффективное планирование.  4.Создание эффективного обзора задач. Самомотивация. Отдых.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=140096');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (240, 'Теория автоматического управления. Нелинейные системы автоматического управления
', 'online.edu.ru', '    Математические модели нелинейных систем управления    Топологический анализ нелинейных систем. Часть 1    Топологический анализ нелинейных систем. Часть 2    Линейные представления нелинейных систем. Часть 1    Линейные представления нелинейных систем. Часть 2    Устойчивость в малом процессов в нелинейных системах    Устойчивость в большом и в целом процессов в нелинейных системах    Абсолютная устойчивость процессов в нелинейных системах    Периодические процессы в нелинейных системах управления    Методы управления в нелинейных системах    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=140097');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (241, 'Термодинамика неравновесных состояний
', 'online.edu.ru', '  Раздел 1 Общий термодинамический подход к описанию макросистем    Макросистемы – способы описания    Отличительные черты и особенности классического    термодинамического описания    Степень отклонения от равновесия – критерий    способов термодинамического описания    Необходимое условие для расширения    термодинамического описания на неравновесные системы    Раздел 2 Линейная термодинамика. Часть №1    Первый закон Онзагера    Второй закон Онзагера    Определение термодинамических сил.    Третий закон Онзагера    Раздел 3 Линейная термодинамика. Часть №2    Диффузионные задачи    Принцип Пригожина    Область нелинейных законов – универсальный критерий эволюции    Раздел 4 Самоорганизация. Диссипативные структуры    Увеличение степени порядка в неравновесных системах    Самоорганизация – эффект Бенара    Самоорганизация – эффект Тейлора    Самоорганизация – реакция Белоусова-Жаботинского    Раздел 5 Нелинейная термодинамика - динамические модели процессов с одной переменной    Динамические модели неравновесных процессов    Автокатализ, динамика популяций    Автокатализ с ветвлением, неравновесные фазовые переходы    Пример неравновесного фазового перехода. Ангармонический осциллятор    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=140098');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (242, 'Менеджмент качества при создании инновационных продуктов.
', 'online.edu.ru', '  Тема 1. Введение.   Цели задачи курса.  Введение. Основы терминологии.  Краткая история проблемы качественного управления.  Логика качественного управления.  Программа Деминга.  Связь инноваций и качества.   Тема 2. Современные требования к специалистам. Квалификации в области менеджмента качества. Квалификация Certified Quality Improvement Associate (CQIA).   Стандарты деятельности специалистов.  Требования к знаниям и навыкам в области менеджмента качества в стандартах деятельности ИТ- специалистов.  Подготовка в области менеджмента качества. Типовые квалификации.  Американская и Европейская организации в области качества. Всероссийская организация в области качества.   Тема 3. Современные бизнес-архитектуры и организационное лидерство.   Законы менеджмента.  Бизнес модель компании. Особенности бизнес-моделей инновационных компаний.  Оргструктура и методы ее формирования: функциональный подход, процессный подход, потоковый подход. Типовые оргструктуры.  Бизнес-архитектура компании как единство оргструктуры и ИТ.  Роль высшего руководства в компании.  Организационное лидерство в современных инновационных компаниях. «Дом инноваций» А.Т. Кеарни.   Тема 4. Команды в современной компании и их роль в инновационном развитии.   Необходимость командной работы в современной компании.  Командообразование.  Роли в команде.  Команды в инновационном проекте и управление ими.   Тема 5. Разработка и развертывание стратегии компании. Стратегии в области качества для инновационной продукции и услуг.   Функции продукции. Инструментальные, адаптивные, репрезентативные, интегративные функции. Технический уровень.  Функциональные, эксплуатационные требования, требования по безопасности продукции. Аспекты продукции в цепочках поставки и их ценность. Отличие инновационной продукции в аспекте гарантии приемлемости рисков применения. Три подхода к созданию приемлемости рисков применения для инновационной продукции.  Качество как отношение ценности и стоимости.  Типовые стратегии в области качества для инновационной продукции и услуг.  Стратегии устойчивого развития компаний.  Менеджмент целей. Основные методики менеджмента целей. Система сбалансированных показателей. Хошин – планирование.  Развертывание стратегии по подразделениям и процессам.  Обзор материала для более эффективного прохождения теста. 1-е промежуточное тестирование.   Тема 6. Инструменты решения проблем при создании инновационной продукции и услуг.   Цикл Деминга. Цикл DMAIC.  Простые инструменты решения проблем.  Оценка и анализ рисков. Анализ рисков применения инновационной продукции и услуг.  FMEA анализ рисков изделий и процессов (FMEA – Failure Mode and Effect Analysis) как ключевой инструмент при создании инновационной продукции и услуг.  Инструменты статистического анализа процессов (SPC – Statistical Process Control) Контрольные карты. Управление стабильностью ключевых характеристик инновационной продукции.  Анализ затрат в процессах.  Инструменты технического творчества: ТРИЗ, функционально-стоимостной и функционально- физический анализ.  Современные инструменты анализа процессов. Роль технологии Big Data.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=140099');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (243, 'Коррозия металлов
', 'online.edu.ru', '    Что такое «Коррозия металлов». Виды коррозии    Теория электрохимической коррозии    Защита от электрохимической коррозии    Газовая коррозия    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141910');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (244, 'Психология и педагогика
', 'online.edu.ru', '   Глава 1.  Введение в психологию. Предмет психологии.   Глава 2. Познавательные процессы, их сущность, классификация. Ощущения, восприятие   Глава 3. Мышление: природа и понятие мышления, его виды; фазы процесса мышления.   Глава 4. Мотивационно-потребностная сфера.   Глава 5. Личность. Индивидуальные особенности личности. Темперамент.   Глава 6. Развитие способностей.   Глава 7.  Развитие личности. Теории развития личности.   Глава 8. Понятие деятельности и ее психологической структуры.   Глава 9. Феномен общения   Глава 10. Педагогика как область гуманитарного знания   Глава 11. Развитие и социализация личности как педагогическая проблема   Глава 12. Образование как социокультурный феномен   Глава 13. Современное понимание сущности и структуры процесса обучения   Глава 14. Организация образовательного процесса   Глава 15. Сущность, содержание и структура воспитания  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141911');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (258, 'Введение в литературоведение
', 'online.edu.ru', '  1. Литературоведение в ряду гуманитарных дисциплин.  2. Текст и Автор.  3. Герой и Читатель  4. Классика и беллетристика  5. Как изучать текст?  6. Язык литературы  7. Текст как мир  8. Пространство в литературе  9. Время в литературе  10. Проблема сюжета  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142085');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (245, 'Правоведение
', 'online.edu.ru', '   РАЗДЕЛ   I  . ОСНОВНЫЕ ПОНЯТИЯ О ГОСУДАРСТВЕ     Глава 1.  Государство: сущность, понятие и признаки. Происхождение государства.   Глава 2.  Формы государства   Глава 3.  Механизм государства   Глава 4.  Государство и гражданское общество. Правовое государство   РАЗДЕЛ   II  . ОСНОВНЫЕ ПОНЯТИЯ О ПРАВЕ    Глава 5.  Право: сущность, функции, принципы ценность права. Право как социальный регулятор   Глава 6.  Понятие и виды источников права. Правотворчество   Глава 7.  Понятие, структура и виды правоотношений   Глава 8.  Правонарушение и юридическая ответственность   Глава 9.  Механизм правового регулирования   РАЗДЕЛ III. ГОСУДАРСТВЕННОЕ ПРАВО    Глава 10.  Основы конституционного права   Глава 11.  Права человека и гражданина   Глава 12.  Муниципальное право   Глава 13.  Уголовное право   Глава 14.  Административное право   Глава 15.  Информационное право   Глава 16. Трудовое право   РАЗДЕЛ   IV  . ЧАСТНОЕ ПРАВО    Глава 17.  Гражданское право   Глава 18.  Семейное право  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141912');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (246, 'Экологическая паразитология
', 'online.edu.ru', '  Глава 1. Введение в паразитологию  Глава 2. Биологическая роль паразитизма  Глава 3. Аутэкологическая паразитология. Часть I  Глава 4. Аутэкологическая паразитология. Часть II  Глава 5. Популяционная паразитология  Глава 6. Синэкологическая паразитология  Глава 7. Антропопаразитоценология  Глава 8. Прошлое, настоящее и будущее паразитов человека  Глава 9. Прикладные аспекты экологической паразитологии: как уберечь себя от заражения паразитами?  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141913');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (247, 'Отечественная история
', 'online.edu.ru', '  1. Зачем изучать прошлое, или как устроена историческая наука? Каменский А.Б. 2. От Древней Руси к Московскому царству: эволюция или смена цивилизаций? Данилевский И.Н. 3. Реформы и репрессии Ивана Грозного. Данилевский И.Н. 4. Отечественное общество XVII века: Древняя Русь или цивилизация Нового Времени? Керов В.В. 5. Петр Великий: создание современной. России Каменский А.Б. 6. Екатерина Великая: Россия в Век Просвещения. Каменский А.Б. 7. Александр и Николай Павловичи: преемственность преобразований. Каменский А.Б. 8. Реформы второй половины XIX и начала ХХ в.: самодержавная модернизация или пролог революции? Давыдов М.А. 9. Модернизация Витте-Столыпина. Давыдов М.А. 10. Революция или Смута: что произошло в России в 1917 году? Новикова Л.Г. 11. Гражданская война в России: победители и побежденные. Новикова Л.Г. 12. Сталинская мобилизационная система в годы предвоенных пятилеток. Хлевнюк О.В. 13. СССР во Второй мировой войне: факторы победы. Будницкий О.В. 14. Н.С. Хрущев. Предпосылки и пределы десталинизации. Хлевнюк О.В. 15. Конец СССР: что пошло не так? Новикова Л.Г.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141914');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (248, 'Маркетинг-менеджмент
', 'online.edu.ru', '   Неделя 1.  Маркетинг-менеджмент – фундамент успешного бизнеса   Неделя 2.  Глобальные тренды новой экономики и изменения в маркетинг-менеджмент   Неделя 3.  Изменения бизнес-среды и новый маркетинг: от поиска «нужного клиента» для понятного бизнеса к поиску «нужного бизнеса» для понятного клиента   Неделя 4.  Влияние маркетинга на результативность бизнеса и роль маркетолога в стратегическом управлении бизнесом   Неделя 5.  Управление стоимостью бизнеса и как маркетологи должны видеть этот процесс и помогать в его реализации   Неделя 6.  Финансовая логика бизнеса и формирование маркетинговых стратегий компании.   Неделя 7.  Как создать такую ценность, которую клиент захочет купить?   Неделя 8.  Клиентоориентированность как основа устойчивого развития компании   Неделя 9.  Ценность продукта: не просто продать, но и получить на этом прибыль   Неделя 10.  Ценность: её можно увеличивать очень разными способами   Неделя 11.  Инновации и управление продуктовым портфелем как основа сохранения устойчивой позиции компании на рынке   Неделя 12.  Маркетинговые войны: принципы и логика подготовки к ним   Неделя 13.  Маркетинговые войны: выбор стратегии   Неделя 14.  Маркетинговые войны: выбор тактики   Неделя 15.  От клиентоориентированности к маркетингу партнерских отношений (МПО)  БОНУС (Доступен только для слушателей, сдавших курс на «хорошо» и «отлично»!)  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141915');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (249, 'Why we post: антропология социальных медиа
', 'online.edu.ru', '   Неделя 1   Антрополог Дэниел Миллер, инициатор запуска проекта Why We Post, знакомит слушателей с изучением социальных медиа с социально-антропологической точки зрения: раскрывается методология, вводится ряд необходимых терминов. Также в рамках этой недели происходит знакомство с местами полевых исследований, в частности, представление двух английских деревень. Здесь и далее каждую тему сопровождает большое обсуждение, где антропологи сводят воедино наблюдения со всех точек проекта.   Неделя 2    Основная тема занятий на этой неделе – возрастающая значимость визуальности и визуального контента. Основываясь на материалах полевых наблюдений на юге Италии и на острове Тринидад, исследователи обсуждают, какие функции выполняют мемы, селфи и другие изображения, циркулирующие в социальных медиа. Также затронута тема изображений как средства коммуникации для малограмотных пользователей в разных частях мира.   Неделя 3   Неделя посвящена тому, как социальные медиа взаимосвязаны с гендерными ожиданиями и политической сферой. Основные материалы были получены в ходе полевой работы в южной Индии и в Турции недалеко от границы с Сирией. Специальный акцент сделан на повседневных практиках использования социальных медиа.   Неделя 4   Подробно обсуждается особое положение Китая в системе современных социальных медиа: описаны уникальные платформы, не используемые за его пределами. Занятия основываются на материалах из «сельского» и «индустриального» Китая. Темы для обобщающих дискуссий: образование, коммерческая деятельность и вопросы приватности. Особый акцент сделан на возможности «переключения» пользовательского внимания с одной платформы на другую в условиях отсутствия технических ограничений.   Неделя 5   Антропологи затрагивают темы социального неравенства и нормативности, а также то, каким образом они проявляются в социальных медиа. Основные полевые наблюдения для этой недели были сделаны в Чили и в Бразилии. Отдельное обсуждение: являются ли соцмедиа-платформы гомогенизирующей силой для разных частей света, а также меняют ли они представление о том, что значит «быть человеком».   Недели6-7   Эта неделя основывается на материалах, собранных российской исследовательской группой в экспедициях по городам России. В фокусе занятий – история интернета и разнообразие способов его распространения и развития. Исследователи рассказывают об особенностях российских городов и предлагают историко-антропологический подход, который дает возможность понять, как менялась среда социальных медиа. В конце недели будетобсуждение исследовательских проектов участников.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141916');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (250, 'Русский язык и культура речи
', 'online.edu.ru', '  Онлайн-курс состоит из восьми разделов.   Раздел 1. Языковая норма. Кодифицированный язык.   1.1 Введение в курс.  1.2 Источники и свойства языковой нормы.  1.3 В чем парадоксальность такого явления, как языковая норма.  1.4 Какая речь может считаться по-настоящему «грамотной» и «правильной» сегодня.   Раздел 2. Языковая норма. Некодифицированный язык.   2.1 «За рамками» нормы: литературный язык и нелитературные формы национального языка. Жаргонизмы.  2.3 «За рамками» нормы: разговорные слова и просторечия.  2.4 «За рамками» нормы: диалектная и устаревшая лексика.   Раздел 3. Меняющийся язык в меняющемся мире.   3.1 Языковая норма: определение и признаки.  3.2 20 век – «эпоха языковых потрясений».  3.3 Вчера – «договоры и горячий кофе», сегодня – «договора и горячее кофе»: причины изменения языковой нормы.  3.4 Лексикографический аспект языковой нормы.  3.5 Что принципиально поменялось в языковой системе за последние годы.   Раздел 4. Интернет-коммуникация.   4.1 Коммуникативный акт как единица общения.  4.2 Активные процессы, происходящие в системе русского языка под влиянием Интернет-коммуникации: трансформация системы функциональных стилей.  4.3 Влияние «интернет-языка» на нормы устной коммуникации.  4.5 Вопрос о влиянии «интернет-языка» на уровень орфографической грамотности.  4.6 Перестройка системы русского языка. Размывание границ между литературной и нелитературной формами.   Раздел 5. Язык СМИ и его влияние на общество.   5.1 Язык новостных СМИ.  5.2 Язык рекламных жанров.  5.3 Речевое манипулирование: тактики, стратегии, используемые языковые средства.  5.4 Публицистический стиль современного русского языка: основы анализа текста.   Раздел 6. Заимствованная лексика: нужна ли она языку и в каком количестве?   6.1 Место заимствованных слов в системе современного русского языка.  6.2 Виды заимствований.  6.3 Причины появления иноязычных слов в системе русского языка.  6.4 Пуризм как способ борьбы с заимствованиями.  6.5 Стилистические функции заимствований в русском языке.   Раздел 7. Морфологические и фонетические нормы современного русского языка.   7.1 Форма числа имен существительных.  7.2 Род несклоняемых существительных.  7.3 Сложные случаи в образовании форм глагола.  7.4 Фонетические нормы.  7.5 Стилистическое использование грамматических категорий имени существительного: категория рода.   Раздел 8. Лексические и фразеологические нормы современного русского языка.   8.1 Лексические нормы современного русского языка.  8.2 Фразеологические нормы современного русского языка.  8.3 Как избежать лексических и фразеологических ошибок в речи.  8.4 Подведение итогов.   Раздел 9. Функциональные стили русского языка.   9.1 Научный стиль.  9.2 Официально-деловой стиль.  9.3 Художественный стиль.  9.4 Разговорный стиль.   Перед итоговой аттестацией проводится вебинар.    Раздел 10. Итоговый раздел (аттестация).   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141917');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (251, 'Статистика для гуманитариев
', 'online.edu.ru', '  Онлайн-курс состоит из девяти разделов:   Модуль 1. Знакомство с пакетом R.    Рабочее пространство в R.  Типы и структуры данных.  Последовательности, векторы, матрицы.  Списки, массивы, факторы.  Объекты типа data.frame.    Модуль 2. Введение в статистику. Предварительная обработка данных. Способы представления выборок.    Введение в статистику.  Сводка, группировка.  Измерительные шкалы и типы данных.  Генеральная и выборочная совокупность.  Табличные способы представления выборок.  Графические способы представления выборок.    Модуль 3. Оценки параметров. Описательные статистики.    Точечные оценки параметров.  Числовые характеристики выборки.  Средние показатели.  Меры вариации.  Структурные характеристики.  Интервальное оценивание.  Предварительная обработка данных (пропуски, выбросы).    Модуль 4. Проверка статистических гипотез.    Проверка статистических гипотез.  Критерии согласия.  Критерии проверки нормальности.    Модуль 5. Сравнение групп. Параметрические и непараметрические критерии.    Параметрические критерии сравнения групп.  Непараметрические критерии сравнения групп.    Модуль 6. Корреляционный анализ.    Корреляционный анализ количественных данных. Парный коэффициент корреляции Пирсона.  Ранговая корреляция.  Корреляционный анализ категоризованных данных. Анализ таблиц сопряженности.    Модуль 7.Регрессионный и дисперсионный анализ.    Регрессионный анализ. Общая постановка задачи.  Парная регрессии.  Множественная регрессия.    Дисперсионный анализ (ANOVA). Общая постановка задачи.  Однофакторный ANOVA.  Двухфакторный ANOVA.    Модуль 8. Анализ рядов динамики. Экономические индексы.    Определение и структура временного ряда.  Методы сглаживания временного ряда.  Сезонная составляющая.  Экономические индексы.    Модуль 9. Итоговая аттестация.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141918');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (259, 'Правовое регулирование отношений в Интернете. Российская перспектива
', 'online.edu.ru', '   Введение. Анархия и порядок в Интернете: правовые аспекты  Борьба за право в Интернете: предпосылки общей методологии  Системные правовые проблемы Интернета: между Сциллой и Харибдой  4 – Кому на Руси в Интернете жить хорошо? Опыт правового регулирования  Свой лунапарк с блэкджеком и нормами. Несколько слов об играх  «Здесь у нас с тобой будущего нет?» Искусственный интеллект и роботы.  Заключение   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142086');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (252, 'История и технологии выживания (Безопасность жизнедеятельности)
', 'online.edu.ru', '   1. Развитие или тупик? История возникновения и исследования глобальных угроз   1.1. Основные опасности и защита от них в истории цивилизаций  1.2. Демографическая проблема  1.3. Опасности исчерпания природных ресурсов и экологическая проблема  1.4. Основные потребности человека и продолжительность жизни  1.5. Основные понятия безопасной жизнедеятельности     2. Четыре стихии смерти. Геолого-атмосферные опасности. Часть 1   2.1. Извержения и землетрясения в истории цивилизации  2.2. Поведение при землетрясении и цунами  2.3. Наводнения  2.4. Лавины, сели и оползни     3. Четыре стихии смерти. Геолого-атмосферные опасности. Часть 2   3.1. Смерчи и ураганы  3.2. Гроза  3.3. Лесные пожары  3.4. Поведение при лесном пожаре     4. Невидимые убийцы. Микробные эпидемии   4.1. Микробы в истории цивилизации  4.2. Чума  4.3. Лепра  4.4. Сифилис  4.5. Туберкулез, грипп, ВИЧ  4.6. Оспа     5. Беспокойные соседи. Опасности животного мира   5.1. Насекомые  5.2. Иксодовые клещи  5.3. Ядовитые змеи  5.4. Опасные обитатели воды  5.5. Дикие животные  5.6 Собаки     6. Робинзон нашего времени. Выживание в природной среде   6.1. Преодоление страха  6.2. Спасение на воде  6.3. Спасение в лесу и горах  6.4. Питание в экстремальной ситуации  6.5. Голод     7. Человек человеку волк. Антропогенные опасности социальной среды   7.1. Пожары в помещениях  7.2. Массовые мероприятия и беспорядки  7.3. Терроризм  7.4. Химическое поражение  7.5. Бактериологическое заражение  7.6. Ядерное поражение     8. Сам себе режиссёр. Безопасность личности   8.1. Поведение при криминальной угрозе  8.2. Рискованный образ жизни  8.3. Бытовой травматизм  8.4. Опасные люди. Мошенничество     9. Человек умелый. Оказание первой помощи   9.1. Искусственное дыхание и массаж сердца.  9.2. Помощь при инфаркте, инсульте и шоке  9.3. Оказание первой помощи при травмах.  9.4. Техническая помощь пострадавшему.   Перед итоговой аттестацией проводится вебинар.  10. Итоговое тестирование     ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=141919');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (253, 'Философия и методология науки
', 'online.edu.ru', '   Модуль 1. Введение   Тема 1. Что такое наука, и какое она имеет отношение к выбранной профессии.  Тема 2. Для чего и как пишется магистерская диссертация.   Модуль 2. Определить приоритеты    Тема 1. Специфика научного знания.  Тема 2. Цель научного исследования.   Модуль 3. Кому это надо    Тема 1. Парадигмы современной науки.  Тема 2. Актуальность исследования.   Модуль 4. Границы    Тема 1. Предметная сфера науки  Тема 2. От темы до объекта и предмета.   Модуль 5. Что было до   Тема 1. Научная традиция.  Тема 2. Степень разработанности проблемы.   Модуль 6. Новое    Тема 1. Абсолютная и относительная новизна  Тема 2. Новизна исследования.   Модуль 7. Выбор пути   Тема 1. Методология в науке.  Тема 2. Методологический синтез или выбор одного метода.   Модуль 8. С чего начать    Тема 1. Экспликация цели в задачи.  Тема 2. Постановка задач.   Модуль 9. Архитектоника    Тема 1. От избранного метода к структуре.  Тема 2. Структура диссертации и материал.   Модуль 10. Дискурсивность науки    Тема 1. Процедуры аргументации.  Тема 2. Обоснование основных тезисов исследования.   Модуль 11. Критерии истинности    Тема 1. Верификация в науке.  Тема 2. Апробация результатов.   Модуль 12. Итоги    Тема 1. Концептуализация в науке.  Тема 2. Работа над ошибками, выводы и перспективы.   Модуль 13. Репрезентация    Тема 1. Формы репрезентации научного знания.  Тема 2. Защита.   Итоговое задание   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142080');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (254, 'Методы доступа к данным и информационного поиска
', 'online.edu.ru', '   Раздел 1 . Алгоритмы широкого применения. Информация из этого раздела развивает общие знания о СУБД  Тема 1. Введение в PostgreSQL. Основные идеи и организация исходного кода  Тема 2. Средства разработки запросов и ядра  Тема 3. B-дерево. Концепция, код и анализ запросов   Раздел 2 . Специальные алгоритмы. Этот раздел рассказывает о решении конкретных задач, в т.ч. в PostgreSQL  Тема 4. Страничная организация памяти  Тема 5. Write-ahead log. Концепция восстановления после сбоя  Тема 6. Обобщённый древовидный индекс (GiST)   Раздел 3 . Специфические алгоритмы. В это разделе рассмотрены алгоритмы, реализованные только в PostgreSQL  Тема 7. Расширения PostgreSQL. сube и smlar  Тема 8. Полнотекстовый поиск. Инверсный индекс (GIN)  Тема 9. Цикл разработки PostgreSQL. Листы рассылки, коммитфесты  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142081');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (282, 'Анализ данных на практике
', 'online.edu.ru', '  Неделя 1: Введение  Неделя 2: Метрики качества. Работа с признаками, постановка задач  Неделя 3: Решающие деревья в задачах классификации и регрессии  Неделя 4: Построение ансамблей. Random Forest и Gradient Forest  Неделя 5: Логистическая регрессия и SVM  Неделя 6: Кластеризация  Неделя 7: Введение в Text Mining  Неделя 8: Introduction in the deep learning  Неделя 9: Deep learning for Data with Sequence Structure  Неделя 10: Рекомендательные системы  Неделя 11: Case Study: Прогнозирование оттока  Неделя 12: Прогнозирование временных рядов  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=605896');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (255, 'Экология
', 'online.edu.ru', '   1. Основы общей экологии   1.1. Введение. Предмет и задачи экологии. Биосфера и человек: структура биосферы. Основные понятия экологии, ее место в системе наук. История экологии. Экология и инженерная охрана природы.  1.2. Экологические системы, их типы, состав и структура. Потоки энергии и круговорот веществ в экосистемах. Продуценты, консументы, редуценты. Трофические цепи и уровни. Продуктивность экосистем. Взаимоотношения организма и среды.  1.3. Экологические факторы и их действие. Абиотические, биотические и антропогенные факторы. Адаптация живых организмов к экологическим факторам. Лимитирующие факторы и закон толерантности. Популяции, их структура и динамика.  1.4. Закономерности функционирования экосистем. Гомеостаз и сукцессионная динамика. Обратные связи и их значение. Роль биоразнообразия. Природные и антропогенные экосистемы. Биосфера, ее строение и эволюция. Моделирование экосистем и управление экологическими процессами.   2. Основы прикладной экологии   2.1. Современная экологическая ситуация и факторы ее формирования. Глобальные, региональные и локальные экологические проблемы. Демографические процессы и их особенности. Истощение природных ресурсов и энергетические проблемы. Загрязнение окружающей среды. Парниковый эффект и озоновые дыры. Кислотные дожди и антропогенное эвтрофирование, их влияние на экологию территорий.  2.2. Экология и здоровье человека. Факторы риска и методы их оценки. Санитарно-гигиеническое и экологическое нормирование качества окружающей среды. Регламентация вредных выбросов в окружающую среду. Оценка ущерба от территориального загрязнения окружающей среды.  2.3. Защита окружающей среды и инженерные природоохранные мероприятия. Экологические принципы рационального использования природных ресурсов и охрана природы. Экологический мониторинг, экологическое моделирование и прогнозирование. Основы экономики природопользования. Принятие решений в сфере природопользования и управление территориальными природно-техническими системами. Техника и технологии защиты окружающей среды.  2.4. Стратегии взаимодействия общества и природы. Концепции и глобальные модели развития .  Международное сотрудничество в области природопользования и охраны окружающей среды. Основы экологического права. Экологическое мировоззрение и экологическая этика. Профессиональная ответственность за экологические нарушения. Повестка дня на XXI век и концепция устойчивого развития.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142082');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (256, 'Цифровые устройства и микропроцессоры
', 'online.edu.ru', '   Общая структура микропроцессорной системы.  Организация работы микроконтроллера.  Порты ввода-вывода МК.  Таймеры.  Быстродействие и надёжность работы микропроцессорных систем/  Интерфейсы МК: UART, RS485.  Интерфейсы МК: SPI.  Аналого-цифровое и цифро-аналоговое преобразования сигналов.  Модули хранения данных.  Устройства ввода.  Устройства вывода  Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142083');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (270, 'Реализация образовательных программ при различных моделях использования онлайн-курсов в учебном процессе
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=564549');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (271, 'Массовые открытые онлайн-курсы в образовании(для вузов)
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=572474');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (260, 'История и культура Санкт-Петербурга и Ленинградской области
', 'online.edu.ru', '   Приневье в политике Великого Новгорода.  Александр Невский – святой покровитель Санкт-Петербурга.  Основание Санкт-Петербурга. Символическая концепция Санкт-Петербурга.  Градостроительная основа петровского Санкт-Петербурга.  Предки петербуржцев: население Санкт-Петербурга за 300 лет.  Управление столицей Российской империи: Царь, полиция, Городская дума.  Петербургский модерн: столичная архитектура конца XIX – начала XX века.  «Эра конструктивизма»: архитектура Петрограда – Ленинграда в 20-е годы ХХ столетия.  Основные этапы развития петербургской промышленности в XVIII – XIX веков.  Историческая память о битве за Ленинград и блокаде Ленинграда.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142087');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (261, 'Современные теории международных отношений
', 'online.edu.ru', '   Введение в теорию международных отношений  Неореализм (Часть I)  Неореализм (Часть II)  Неолиберализм (Часть I)  Неолиберализм (Часть II)  Глобализм  Постпозитивизм (Часть I)  Постпозитивизм (Часть II)  Постпозитивизм (Часть III)  Постпозитивизм (Часть IV)   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142088');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (262, 'Налоговое право
', 'online.edu.ru', '  1. Налоговое законодательство  2. Понятие и система налогов и сборов.  3. Правовой статус участников налоговых правоотношений  4. Налоговое обязательство и его исполнение.  5. Налоговый контроль  6. Производство о налоговых правонарушениях  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142089');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (263, 'Геометрия и группы
', 'online.edu.ru', '   Введение  Движения прямой  Движения окружности  Начальная теория групп  Факторизация групп  Взаимно-однозначные соответствия  Числа, преобразования и подобия  Комплексные числа  Движения сферы и плоскости  Нормальные подгруппы и факторгруппы  Кватернионы  Проективная геометрия  Двойное отношение  Введение в топологию  Фундаментальные группы  Экзамен   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142190');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (264, 'Случайные графы
', 'online.edu.ru', '   1 неделя.  Две модели случайного графа  2 неделя.  Теорема о пороговой вероятности для свойства связности  3 неделя.  Вероятностный метод  4 неделя.  Хроматическое число случайного графа  5 неделя.  Алгоритмы на случайном графе  6 неделя.  Малые подграфы в случайном графе  7 неделя.  Итоги  8 неделя.  Итоговый тест  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=142191');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (265, 'Историческая география
', 'online.edu.ru', '   Глава 1.  Историческая география как вспомогательная историческая дисциплина   Глава 2.  Историческая география как часть современной географии человека   Глава 3.  Окружающая среда как проблема исторической географии   Глава 4.  Ландшафт как проблема современной исторической географии   Глава 5.  Пространственный анализ и региональный (районный) подход как проблемы современной исторической географии   Глава 6.  Критическая историческая география: политическая география и деконструкция геополитики   Глава 7.  Критическая историческая география: колониализм, ориентализм, постколониализм, феминизм   Глава 8.  Междисциплинарность в исторической географии  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=144710');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (266, 'Английский язык. Подготовка к  кандидатскому экзамену.
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=144936');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (267, 'Введение в цифровую культуру
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Архитектура ЭВМ и ОС  Технологии программирования  Информационная безопасность  Сетевые технологии  Квантовые технологии  Цифровая этика  Основы персональной информационной безопасности  Цифровое образование  Цифровая экономика. Блокчейн  Библиографический поиск  Технологии виртуальной, дополненной и смешанной реальности  Культура Интернет-коммуникаций  Встроенные системы  Цифровые гуманитарные науки   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=145100');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (268, 'Первичная обработка и хранение данных
', 'online.edu.ru', '    Виды и источники данных. Загрузка и разделение данных. Объединение данных из разных источников. Очистка данных и заполнение пропусков. Контроль диапазонов.    Первичная обработка данных. Сглаживание и нормировка данных. Преобразование данных. Визуализация данных. Формы представления количественных и качественных данных. Когнитивная визуализация данных.    Хранение и доступ к данным. Виды баз данных. Реляционные СУБД    NoSQL базы данных. Большие данные.    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=145102');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (269, 'Использование онлайн-курсов для непрерывного самообучения
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=564548');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (272, 'Технология построения индивидуальной траектории профессиональной карьеры
', 'online.edu.ru', '   Раздел 1. Рынок труда    Тема 1.1 Рынок труда: понятие, функции, элементы. Классификация рынков труда. Конкуренция на рынке труда.  Тема 1.2 Занятость. Безработица. Государственное регулирование занятости. Федеральный закон РФ «О занятости населения в Российской Федерации». Отраслевая структура занятости Санкт-Петербурга.   Раздел 2. Профессиональная деятельность   Тема 2.1 Профессиональная деятельность: виды, типы, режимы. Классификация профессий.  Тема 2.3 Модели конкурентоспособности работника.   Раздел 3. Технология трудоустройства   Тема 3.1. Алгоритм поиска работы. Методы поиска вакансий. Источники информации о вакансиях.  Тема 3.2. Основные правила подготовки и оформления резюме. Техника ведения телефонных переговоров с потенциальным работодателем.  Тема 3.3. Методы отбора персонала.  Тема 3.4. Подготовка к собеседованию с потенциальным работодателем.   Раздел 4. Профессиональная адаптация   Тема 4.1. Требования профессии к человеку. Профпригодность.  Тема 4.2. Учет индивидуальных психологических особенностей личности в профессиональной деятельности.  Тема 4.3. Понятие «адаптация». Профессиональная адаптация, ее виды.  Тема 4.4. Планирование и реализация профессиональной карьеры. Виды карьеры.  Тема 4.5. Социально-профессиональная мобильность личности.   Раздел 5. Правовое регулирование трудовых отношений   Тема 5.1. Понятие, источники трудового права. Социальное партнерство: понятие, сущность, формы.  Тема 5.2. Коллективный договор.  Тема 5.3. Трудовой договор: понятие, виды, содержание.  Тема 5.4. Дисциплина труда. Трудовые споры. Порядок разрешения трудовых споров.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=604839');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (273, 'История и методология науки
', 'online.edu.ru', '  Программа курса включает 16 тематических занятий, каждое из которых предполагает лекционные материал, практические задания и задание для самостоятельной работы учащегося:  Тема 1. Сущность и особенности науки. Научная картина мира  Тема 2. Эволюция подходов к изучению научного знания  Тема 3. Классификация наук. Уровни научного познания  Тема 4. Наука в общекультурном контексте. Этика науки  Тема 5. Идеалы и нормы научного исследования  Тема 6. Формы научного познания  Тема 7. Представление о методе и методологии науки  Тема 8. Научное творчество  Тема 9. Проблема начала науки и вариативность периодизации  Тема 10. Пранаука. Первые научные программы Античности и их развитие в эпоху Средневековья  Тема 11. Становление классической науки: Возрождение и научная революция XVI-XVIII веков  Тема 12. Классическая наука и ее кризис на рубеже XIX-XX веков  Тема 13. Трансформации науки ХХ столетия и научно-техническая революция  Тема 14. Главные характеристики и особенности современной науки  Тема 15. Методологический плюрализм и междисциплинарная методология современной науки  Тема 16. Специфика современной научной картины мира  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=604950');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (274, 'История ИЗО
', 'online.edu.ru', '    Модуль I. Искусство Западной Европы от Древнего мира до современности    Тема 1. Виды искусства  Тема 2. Искусство Древнего мира  Тема 3. Искусство средних веков  Тема 4. Искусство Возрождения  Тема 5. Искусство XVII- XVIII веков  Тема 6 Искусство XIX века  Тема 7. Искусство XX века    Модуль I    I    . Русское искусство    Тема 8. Русское искусство  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=604952');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (322, 'Анализ и моделирование бизнес-процессов
', 'online.edu.ru', '   Организации как сложные социотехнические системы  Структурный анализSADT/IDEF0/…  Теоретические основы управления процессами  АRIS  BPMN  Эталонные и референтные модели бизнес-процессов  Методы анализа бизнес-процессов  Совершенствование, реинжиниринг, цифровизация  ИТ в анализе, совершенствовании и управлении бизнес-процессами  Операционные риски   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980387');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (276, 'Экономика предприятия. Часть 3. Управленческий учет
', 'online.edu.ru', '   Введение    Модуль 1. Введение в правленческий учет. Затраты как основной объект управленческого учета    Управленческий учет и его роль в системе управления предприятием. Сравнительная характеристика финансового и управленческого учета.  Затраты – основной объект управленческого учета. Сущность и классификация затрат.  Структура затрат по периодичности возникновения и экономическим элементам.  Классификация затрат по статьям себестоимости.  Классификация затрат по способу их отнесения на объект затрат.  Классификация затрат по отношению к объему выпускаемой продукции.  Структура затрат по функциям управления, регулируемые и нерегулируемые затраты, по вариантам управленческих решений.    Модуль 2. Классификация систем управленческого учета: классификация систем по способу группировки затрат    Организационные аспекты управленческого учета, самостоятельно определяемые организацией: классификация систем управленческого учета. Децентрализация управления и система учета по центрам ответственности.  Системы управленческого учета по способу группировки затрат Система управления по полной себестоимости (absorption/fullcosting)  Система Activity-Based Costing как инструмент управления предприятием.  Система управления по ограниченной себестоимости (direct-costing/marginalcosting).    Модуль 3. Классификация систем управленческого учета по методам учета затрат. Система нормативного учета    Методы учета и калькулирования себестоимости.  Позаказный метод учета затрат и сфера его использования. Попроцессный метод учета затрат и сфера его использования. Попередельный метод учета затрат и сфера его использования.  Сущность системы нормативного учета. Нормативный учет и «стандарт-кост» (standard- costing) как инструменты учета, планирования и контроля затрат.  Учет изменений норм и нормативов. Отклонения затрат и их анализ как средство контроля затрат. Методы анализа отклонений.    Модуль 4. Планирование. Бюджетирование. Управленческий учет в системе принятия управленческих решений    Основы планирования и бюджетирования.  Разработка главного бюджета. Разработка бюджетов по центрам ответственности, функциональным областям и видам продукции (проектам).  Процесс принятия управленческих решений. Обеспечение релевантной информацией для принятия решений по управлению бизнесом.  Процедура и критерии принятия краткосрочных управленческих решений.  Процедура и критерии принятия долгосрочных управленческих решений.  Информационные системы управленческого учета.    Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=604954');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (277, 'Уильям Шекспир в историко-культурной традиции: загадки, мифы, реальность
', 'online.edu.ru', ' В рамках данного курса рассматриваются загадки, реальность и мифы о жизни и творчестве поэта. Основные темы курса:   Является ли Уильям Шекспир из Стратфорда автором традиционно приписываемых ему произведений?   Секреты величия произведений, что привлекает читателя в текстах произведений Уильяма Шекспира?  Как мог молодой человек из провинции создать тексты, являющиеся образцами словесно-художественного творчества?   В лекционном материале подробно рассмотрены мифы и загадки, которые  вытекают из выше указанных основных тем. Данные темы рассматриваются в контексте исторических событий, фактов и культурных традиций Англии того времени. Так же подробно рассматриваются предпосылки формирования мифов и загадок вокруг биографии и творчества поэта. В ходе лекций мифы и загадки находят свое логическое объяснение и толкование. ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=605181');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (300, 'Основы бизнеса
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607490');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (278, 'Молекулы и болезни: ионные каналы и переносчики
', 'online.edu.ru', '  Основная группа слушателей для которых разработан курс:  преподаватели и сотрудники высших и средних специальных образовательных организаций.  Содержание курса:    Знакомство.Вступительное слово.  Историческая справка или что такое обучающий фильм?  Аудитория, задачи и этапы производства.  Подготовительный период. Пре-продакшен.  Съемочный период. Продакшен.  Монтажный период. Пост-продакшен.  Распространение.  Авторское право.  Ошибки и добрые советы начинающим.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=605182');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (279, 'Теория решения изобретательских задач.
', 'online.edu.ru', '    Введение в ТРИЗ.    Технические системы и потребители их продуктов    Исследование функционирования систем и постановка задач    Причинно следственный анализ систем.    Поиск ресурсов решения задач.    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=605891');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (280, 'Введение в инженерию больших данных
', 'online.edu.ru', '  Разделы курса:    Определения термина «Большие данные» (Big Data)    Что такое Большие Данные    Предпосылки появления технологий Big Data    Характеристики Big Data    Примеры    Вызовы Big Data    Особенности работы с большими данными    Подходы к архитектуре Big Data систем      Обзор экосистемы Apache Hadoop    Базовые понятия    Apache Hadoop    История появления    Возможности Apache Hadoop    Экосистема Apache Hadoop    Основные компоненты    HDFS    Принцип работы HDFS      Распределенные вычисления    Особенности распределенных вычислений    Парадигма MapReduce    Принцип работы MapReduce    Пример MapReduce - счетчик слов в тексте    MapReduce и YARN      Apache Spark    Введение    Принципы работы Apache Spark    Resilient Distributed Dataset (RDD): возможности и свойства    Доступные операции над RDD    Библиотеки Spark      Получение данных    Введение Flume    Принцип работы    Source    Channel    Sink      SQL on Hadoop    Hive    Форматы хранения    Компрессия    UDF      Визуализация данных    Обзор способов визуализации    Apache Zeppelin    Cloudera Search (Solr + Hue)      Прочие компоненты экосистемы Hadoop    Sqoop    Nutch    Hbase    Zookeeper    Oozie    Pig    Impala        Практическая часть - анализ данных twitter  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=605894');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (281, 'История и философия науки и технологии
', 'online.edu.ru', '   Раздел 1.  Философия техники и индустриальное наследие  
 
 Философия техники: термины и определения 
 Обзор истории инженерного образования 
 Музеи техники 
 Заповедники промышленности 
 
  Раздел 2.  Философия техники и индустриальное наследие (продолжение) 
 
 Индустриально-археологические парки 
 Музеи будущего и современные методы исторических исследований 
 Воссоздание исторического индустриального ландшафта. 
 
  Раздел 3.  Компьютерное моделирование объектов индустриального наследия 
 
 Доменная печь Лиенсхютте (Lienshytte blast-furace) 
 Железоделательный завод Энгельсберг (Engelsbergs bruk) 
 Анимация сыродутного процесса по описанию и зарисовкам середины XIX в. 
 Анимация работы горных машин по гравюрам XVI в. 
 Вагранка Реомюра 
 Лаборатория Генри Бессемера 
 
  Раздел 4 . Предыстория науки и техники 
 
 Хронология цивилизации 
 Археохронология 
 Неолитическая революция 
 Минералы меди и железа 
 
  Раздел 5.  Зарождение металлургии 
 
 Основные закономерности 
 Первые металлургические технологии 
 Ювелирное искусство 
 Мышьяковая бронза 
 Оловянная бронза 
 
    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=605895');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (283, 'Управление интеллектуальной собственностью
', 'online.edu.ru', '  ВВЕДЕНИЕ   РАЗДЕЛ I. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ. ПРАВИЛА ИГРЫ   Интеллектуальная собственность и интеллектуальные права  Основы патентного права  Основы авторского права  Товарные знаки и доменные имена  Секрет производства  Международное законодательство   Раздел II. ИНТЕЛЛЕКТУАЛЬНЫЕ ПРАВА: КОНФЛИКТЫ ИНТЕРЕСОВ   Внутрикорпоративные конфликты  Конкурентные конфликты   Раздел III УПРАВЛЕНИЕ ПАТЕНТНЫМ ПОРТФЕЛЕМ   Патентная стратегия – содержание и модели рыночного поведения  Выбор объектов, способов и территории правовой охраны  Анализ патентных рисков   Раздел IV ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ КАК СТРАТЕГИЧЕСКИЙ РЕСУРС   Корпоративные цели и стратегии управления ИС  Оценка эффективности управления интеллектуальной собственностью  Оценка стоимости интеллектуальной собственности  Патентные исследования  Использование Патентных ландшафтов при выборе технологической стратегии и в конкурентной разведке   ИТОГОВАЯ ДИСКУССИЯ (Прямая линия с авторами курса)  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606291');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (284, 'Нормативно-правовое обеспечение онлайн-обучения и организация виртуальной академической мобильности
', 'online.edu.ru', '  Раздел 1. Проблемы современного образования Раздел 2. Нормативное регулирование федерального уровня по вопросам применения электронного обучения и дистанционных образовательных технологий Раздел 3. Современные тенденции развития университетов Раздел 4. Реализация образовательных программ с использованием электронного обучения и дистанционных образовательных технологи в вузе в соответствии с требованиями нормативных правовых актов федерального уровня Раздел 5. Локальная нормативная базы образовательной организации, регулирующая использование электронного обучения и дистанционных образовательных технологий при реализации образовательных программ Раздел 6. Условия реализации различных моделей использования онлайн-курсов в образовательном процессе Раздел 7. Особенности образовательных программ при включении виртуальной академической мобильности Раздел 8. Реализация виртуальной академической мобильности при взаимодействии между образовательными организациями   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606293');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (285, 'Системы автоматизированного проектирования
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:  1. Autodesk Fusion 360. Обзор облачной среды проектирования 2. Интерфейс и работа с эскизами в AutodeskFusion 360 3. Твердотельное моделирование в среде AutodeskFusion 360. Создание геометрии 4. Твердотельное моделирование в среде AutodeskFusion 360. Редактирование геометрии 5. Твердотельное моделирование в среде AutodeskFusion 360. Операции с телами и деталями 6. Работа с материалами, текстурами и анализ геометрии 7. Инструменты поверхностного моделирования. Обзор 8. Инструменты редактирования свободной геометрии. Обзор 9. Среда создания фотореалистичных изображений. Обзор 10. Специальные модули и возможности AutodeskFusion 360  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606524');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (286, 'Теория механизмов и машин
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Основные понятия теории механизмов и машин.  Структурный анализ механизмов.  Кинематический анализ механизмов.  Динамика машин и механизмов.  Силовой расчет механизмов.  Виброактивность и виброзащита машин.  Уравновешивание механизмов.  Теория эвольвентного зацепления.  Механизмы с высшими парами.  Кулачковые механизмы.  Синтез механизмов с низшими парами.  Планетарные механизмы.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606525');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (287, 'Разработка Android-приложений для мобильных устройств
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Тема 1. Знакомство с ОС Android.     Введение    Установка необходимого программного обеспечения    Настройка SDK Manager и создание эмулятора    Создание проекта и запуск на устройстве    Настройка внешнего вида Android Studio      Тема 2. Работа с разметкой.     Интерфейс Android Studio    Редактор макета    Работа с TextView    Родительские макеты    Класс Activity, внутренние и внешние отступы     Тема 3. Элементы управления     Основные элементы управления    Создание приложения «Тест» ч.1    Создание приложения «Тест» ч.2    Создание приложения «Список сериалов» ч.1    Создание приложения «Список сериалов» ч.2     Тема 4. Активити и интенты     Множественные активности и интенты    Создание приложения «Передача данных» ч.1    Создание приложения «Передача данных» ч.2    Создание приложения «Вызов сторонних приложений» ч.1    Создание приложения «Вызов сторонних приложений» ч.2     Тема 5. Жизненный цикл активити     Управление жизненным циклом активити    Создание приложения «Жизненный цикл активити» ч.1    Создание приложения «Жизненный цикл активити» ч.2    Создание приложения «Таймер» ч.1    Создание приложения «Таймер» ч.2     Тема 6. Адаптеры и списки     Адаптеры и списки    Создание простейшего спискового приложения    Создание приложения «Спорт» ч.1    Создание приложения «Спорт» ч.2    Создание приложения «Спорт» ч.3     Тема   7.   Элемент   RecyclerView     RecyclerView    Построение RecyclerView    Создание приложения «Grumpy Cat» ч.1    Создание приложения «Grumpy Cat» ч.2    Создание приложения «Grumpy Cat» ч.3     Тема 8. Фрагменты     Фрагменты    Создание приложения «Фрагменты» ч.1    Создание приложения «Фрагменты» ч.2    Заключение      Каждая тема предполагает изучение в течение одной недели.  В курсе имеется два типа дедлайна (предельного срока выполнения оценивающих мероприятий): – мягкий дедлайн, при котором необходимо выполнить все оценивающие мероприятия текущей недели до ее завершения; – жесткий дедлайн, при котором на выполнение оценивающих мероприятий после мягкого дедлайна дополнительно выделяется еще две недели, по окончании которых доступ к соответствующим мероприятиям закрывается.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606526');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (288, 'Аддитивные технологии и 3D-печать
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Введение в аддитивные технологии  Начало работы, обзор интерфейса.  Редактирование моделей.  Ремонт моделей и исправление ошибок  Измерения  Слайсинг  Поддерживающие структуры  Рабочие пространства машин   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606527');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (289, 'Предпринимательство в креативных индустриях
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Понятие предпринимательства. Предпринимательство и менеджмент.  История предпринимательства и менеджмента.  Основные теории предпринимательства и менеджмента.  Креативные индустрии: понятие, виды. Особенности деятельности в креативных индустриях.  Бизнес-моделирование в креативных индустриях.  Анализ рынка. Сегментация и работа с потребителем.  Конкуренты, партнеры, events.  Фандрайзинг и поиск финансовых средств.  Расчет сметы и калькуляция затрат.  Ресурсное обеспечение, управление ресурсами  Риски и оценка рисков.  Источники дохода и окупаемость  Бизнес-планирование  Защита интеллектуальной собственности и РИД   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606528');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (290, 'Цифровой маркетинг и социальные сети
', 'online.edu.ru', '  Модуль 1. Цифровой и классический маркетинг: взаимоотношения, интеграция, перспективы.  Тема 1. Классический и цифровой маркетинг.  Тема 2. Выбор целевых сегментов и средств коммуникации.  Модуль 2. Интернет как основная среда цифрового маркетинга.  Тема 3. Сайты, мобильные приложения, посадочные страницы.  Тема 4. SEO.  Тема 5. Контекстная реклама.  Тема 6. E-mail маркетинг, продвижение в мессенджерах и CPA маркетинг.  Тема 7. Медийная (баннерная) реклама.  Тема 8. Анализ данных и web аналитика.  Модуль 3. Социальные сети.  Тема 9. Контент маркетинг.  Тема 10. Таргетированная реклама.  Тема 11. Сарафанный маркетинг.  Модуль 4. Off-line инструментарий цифрового маркетинга.  Тема 12. Цифровая экономика.  Тема 13. Off-line цифровая реклама.  Модуль 5. Информационные системы цифрового маркетинга.  Тема 14. CRM системы.  Тема 15. Big Data в маркетинге.  Модуль 6.  Итоговая аттестация.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=606529');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (291, 'Формализация моделирования
', 'online.edu.ru', '  Тема 1. Концепция визуального моделирования в программной инженерии.  Тема 2. Функциональные требования и варианты использования.  Тема 3. Моделирование предметных областей и архитектуры программного обеспечения.  Тема 4. Моделирование поведения графами переходов состояний.  Тема 5. Моделирование поведения потоками управления и данных.  Тема 6. Моделирование поведения последовательностью сообщений.  Тема 7. Моделирование параллелизма.  Тема 8. Практическое применение UML в процессе разработки прикладного программного обеспечения.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607320');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (292, 'Основы нефтегазового дела
', 'online.edu.ru', '  Раздел 1. Общая характеристика нефти и газа.  Раздел 2. Месторождения углеводородов.  Раздел 3. Этапы строительства и освоения нефтяных и газовых скважин.  Раздел 4. Физика и технология разработки и эксплуатации месторождений нефти и газа.  Раздел 5. Промысловый сбор, подготовка и транспорт углеводородов.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607322');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (293, 'Технологии «Фабрик Будущего»
', 'online.edu.ru', '  Основные темы курса:   Мировые промышленные тренды. Industry 4.0  Цифровая экономика  Концепция Фабрик Будущего  Цифровое проектирование. Цифровая фабрика  Аддитивные технологии  Новые материалы  Инструменты цифровой трансформации компании  Инструменты управления цифровой компанией  «Умная» фабрика  Виртуальная фабрика   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607323');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (294, 'История и философия технической реальности
', 'online.edu.ru', '  Программа курса включает 12 тематических занятий, каждое из которых предполагает лекционные материал, практические задания и задание для самостоятельной работы учащегося:  Тема 1. Проблема дефиниций. Техника и технология в ряду иных понятий современного социогуманитарного дискурса  Тема 2. Предмет и структура философии техники. О научных подходах историко-философского изучения техники  Тема 3. Истоки техники и первые технологии  Тема 4. Порядки первичных форм осмысления технической действительности. Барьеры и разграничения традиционной культуры  Тема 5. В преддверии техногенных доминант  Тема 6. Великая индустриальная революция и техногенные параметры индустриального общества  Тема 7. Модели соотношения науки и техники  Тема 8. Философия техники: первые концепции  Тема 9. Техника и ее репрезентация в первой половине ХХ века  Тема 10. НТР: на пути глобальных техногенных трансформаций и переосмысления технической действительности  Тема 11. Глобальная техника, информационная революция и неоиндустриализм  Тема 12. Традиции отечественной мысли и новые стратегии анализа техники в России  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607324');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (316, 'Основы международных стандартов финансовой отчетности
', 'online.edu.ru', '   Принципы подготовки финансовой отчетности по МСФО  Особенности оценки активов и обязательств по МСФО  Состав финансовой отчетности согласно МСФО  Отчет о движении денежных средств по МСФО  Основные средства согласно МСФО  Нематериальные активы согласно МСФО  Инвестиционная собственность по МСФО  Запасы согласно МСФО  Финансовые инструменты согласно МСФО  Резервы, условные обязательства и условные активы согласно МСФО  Налог на прибыль согласно МСФО  Выручка согласно МСФО   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980381');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (295, 'Организация, технология и проектирование предприятий торговли
', 'online.edu.ru', '   Основы государственного регулирования торговли в Российской Федерации  Правовое регулирование внутренней торговли в РФ  Стратегия развития торговли РФ на 2015-16 годы и период до 2020 года    Организация хозяйственных связей в процессе товародвижения  Характеристика процессов товародвижения  Организация хозяйственных связей в сфере товарного обращения    Организация и технология оптовой торговли  Оптовые торговые структуры  Товарные склады в сфере товарного обращения  Техническое обеспечение работы товарных складов  Организация и проектирование товарных складов    Управление розничной торговлей (территориальный аспект)  Типизация и специализация розничных торговых организаций  Территориальное регулирование развития торговли  Размещение организаций розничной торговли     ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607325');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (296, 'Основы информационной культуры
', 'online.edu.ru', '  Тема 1. Мы живём в информационном пространстве (информация: свойства, действия, подходы к изучению). Тема 2. Информационное моделирование (понятие модели, информационные модели, формы представления информации). Тема 3. Инструменты для работы с информацией (компьютер и мозг - процесс работы с информацией). Тема 4. Кодирование и измерение информации (представление информации в компьютере, объёмный и содержательный подходы к измерению информации). Тема 5. Программное обеспечение компьютера (классификация, системные и сервисные программы, файловая система). Тема 6. Прикладные программы для работы с информацией в различных формах (обзор программ для работы с текстовой, графической, числовой информацией; компьютерный офис, виды лицензий на программное обеспечение). Тема 7. Работа с текстовым редактором (цели структуризации и форматирования, возможности с MS Word, базовые навыки, необходимые для создания научно-технического текста в рамках стандартов). Тема 8. Компьютерные сети. Киберпространство (компьютерные сети, Интернет, техника поиска в Сети, киберэтика и кибербезопасность).  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607326');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (297, 'Введение в китайскую иероглифику
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607327');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (298, 'Японский язык. Начальный уровень
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607328');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (299, 'Основы эффективного делового общения
', 'online.edu.ru', '  Модуль 1. "Точная коммуникация"  Модуль 2. "Система основных регуляторов делового общения"  Модуль 3. "Общие представления о деловом этикете"  Модуль 4. "Деловой имидж"  Модуль 5. "Азбука общения"  Модуль 6. "Особенности вербальной коммуникации"  Модуль 7. "Переговоры. Основные понятия"  Модуль 8. "Мифы переговоров"  Модуль 9. "Медиация, посредничество и производные от них формы деловых коммуникаций"  Модуль 10. "Культура деловой речи. Работа с документами и письмами"  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=607329');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (301, 'Методы исследования в менеджменте
', 'online.edu.ru', '  Лекция 1: Введение в курс. Гистограммы. Диаграммы рассеяния. Лекция 2: Временные ряды. Сводные таблицы. Лекция 3: Сводные таблицы – примеры анализа. Лекция 4: Обобщающие показатели. Прямоугольные диаграммы. Лекция 5: Матрица парных корреляций. Общий пример анализа данных. Лекция 6: Кейс «Благосостояние». Лекция 7: Основные правила теории вероятностей. Формализация случайных величин. Визитная карточка случайной величины – математическое ожидание и стандартное отклонение. Лекция 8: Совместные и условные вероятности. Биномиальные и нормальные определения. Лекция 9: Статистические оценки. Общий план анализа недетерминированной ситуации. Лекция 10: Типовые статистические задачи. Лекция 11: Принятие решений в недетерминированных многошаговых ситуациях. Надстройка TreePlan. Лекция 12: Примеры выбора решений с использованием надстройки TreePlan.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=929744');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (302, 'Квантовая электроника
', 'online.edu.ru', '  Курс состоит из 5 разделов:   Введение  Коэффициенты поглощения и усиления  Взаимодействие с некогерентным полем  Линейная поляризация среды  Двухуровневая модель   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=929745');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (303, 'Введение в квантовые вычисления
', 'online.edu.ru', '  Лекция 1. Введение. Историческая перспектива и современное состояние области. Зарождение индустрии квантовых вычислений. Представление об особенностях квантовых вычислений на примере простейшего алгоритма Дейча.  Лекция 2. Необходимые сведения из теории вычислительной сложности алгоритмов. Понятие алгоритма, машина Тьюринга, универсальная машина Тьюринга. Вычислимые и невычислимые функции, проблема остановки. Задачи разрешимости, представление о классах вычислительной сложности. Классы P и NP. Вероятностная машина Тьюринга, класс BPP. Задачи пересчёта количества решений, класс сложности #P. Проблема демонстрации квантового превосходства на примере задачи BosonSampling.  Лекция 3. Гейтовая модель классических вычислений, универсальные вентили. Гейтовая модель квантовых вычислений. Элементарные квантовые логические вентили, однокубитные и двухкубитные вентили. Условные двухкубитные вентили, представление условных многокубитных вентилей через двухкубитные. Описание измерений в квантовой теории, описание измерений в квантовых схемах.  Лекция 4. Универсальность однокубитных вентилей и вентиля CNOT. Дискретизация однокубитных вентилей, универсальные дискретные наборы вентилей. Сложность аппроксимации произвольного унитарного преобразования.  Лекция 5. Квантовое преобразование Фурье. Алгоритм оценки фазы, оценка необходимых ресурсов, упрощённый алгоритм Китаева. Экспериментальные реализации алгоритма оценки фазы и приложения к расчёту молекулярных термов.  Лекция 6. Алгоритм поиска периода функции. Факторизация чисел на простые множители, алгоритм Шора. Экспериментальные реализации алгоритма Шора. Другие алгоритмы, основанные на квантовом преобразовании Фурье.  Лекция 7. Квантовые алгоритмы поиска. Алгоритм Гровера, геометрическая иллюстрация, оценка ресурсов. Подсчёт числа решений поисковой задачи. Ускорение решения NP-полных задач. Квантовые поиск в неструктурированной базе данных. Оптимальность алгоритма Гровера. Алгоритмы, основанные на случайных блужданиях. Экспериментальные реализации поисковых алгоритмов.  Лекция 8. Классические коды коррекции ошибок, линейные коды. Ошибки в квантовых вычислениях, отличие от классического случая. Трехкубитный код, исправляющий X-ошибку. Трехкубитный код, исправляющий Z-ошибку. Девятикубитный код Шора.  Лекция 9. Общая теория исправления ошибок, дискретизация ошибок, модель независимых ошибок. Классические линейные коды, коды Хэмминга. Квантовые коды Кальдербанка-Шора-Стина.  Лекция 10. Формализм стабилизаторов, построение кодов КШС в формализме стабилизаторов. Унитарные преобразования и измерения в формализме стабилизаторов. Понятие о вычислениях, устойчивых к ошибкам. Построение универсального набора устойчивых к ошибкам вентилей. Измерения, устойчивые к ошибкам. Пороговая теорема. Экспериментальные перспективы реализации квантовой коррекции ошибок и устойчивых к ошибкам вычислений.  Лекция 11. Квантовые симуляции: «цифровые» и аналоговые. Некоторые экспериментальные реализации и перспективы аналоговых квантовых симуляций.  Лекция 12. Квантовые вычисления на NISQ-устройствах. Квантовые вариационные алгоритмы: QAOA и VQE. Приложения к задачам квантовой химии. Возможности реализации на современных квантовых процессорах, перспективы развития.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=929746');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (304, 'Квантовая криптография
', 'online.edu.ru', '  Лекция 1. Краткий экскурс в историю криптографии. Что такое квантовая криптография, и какие задачи она решает. Одноразовые ключи. Критерий Шеннона абсолютной секретности. Существующие достижения в квантовой криптографии.  Лекция 2. Основы математического аппарата квантовой информатики: описание квантовых состояний отдельных и составных квантовых систем, чистые, смешанные состояния, квантовая запутанность, ортогональные и обобщенные измерения, очищение квантовых состояний, теорема о запрете копирования, преобразования квантовых систем, вполне положительные отображения.  Лекция 3. Меры близости квантовых состояний, используемые в протоколах квантовой криптографии.  Лекция 4. Основные протоколы квантовых коммуникаций и их описание: квантовая телепортация, сверхплотное кодирование, квантовое распределение ключей. Основные протоколы квантового распределения ключей: BB84, B92, E91, SARG04, фазово-временное кодирование, дифференциально-фазовое кодирование, релятивистское квантовое распределение ключей через открытое пространство с синхронизацией и без синхронизации часов на приемной и передающей стороне.  Лекция 5. Продолжение. Основные протоколы квантового распределения ключей и их реализации.  Лекция 6. Основные понятия классической теории информации. Энтропии Шеннона, Реньи и их свойства. Условная, взаимная информация, типичные последовательности, теоремы кодирования источника, прямая и обратная теоремы кодирования для канала с шумом, пропускная способность  Лекция 7. Продолжение – основные понятия классической теории информации. Примеры.  Лекция 8. Энтропия фон Неймана, основные свойства и использование в квантовой теории информации. Понятие квантовых каналов связи. Классическая пропускная способность квантового канала связи. Индивидуальные и коллективные измерения в квантовой криптографии.  Лекция 9. Продолжение -- Фундаментальная граница Холево для достижимой границы классической информации. Множественность атак подслушивателя, связь атак с пропускными способностями квантового канала.  Лекция 10. Основные свойства квантовых энтропий Реньи (min и max энтропий). Сглаженные min и max энтропии, цепочечные правила, изменение min и max энтропий при действии супероператора, свойства min и max энтропии для составных квантовых систем.  Лекция 11. Энтропийные соотношения неопределенностей в квантовой криптографии, связь с min и max энтропиями Реньи.  Лекция 12. Критерий секретности ключей в квантовой криптографии, основанный на следовом расстоянии. Универсальные хэш-функции второго рода, использование в процедурах усиления секретности. Теорема об остатке хэширования (Left over hash Lemma).  Лекция 13. Доказательство секретности квантового распределения ключей на примере протокола BB84, основанное на энтропийных соотношениях неопределенностей (случай строго однофотонного источника информационных состояний).  Лекция 14. Анализ криптографической стойкости реализаций систем квантовой криптографии с не идеальными источниками квантовых состояний, детекторами и квантовым каналом связи с потерями. Атака с расщеплением по числу фотонов, атака с измерениями с определенным исходом, прозрачная атака со светоделителем.  Лекция 15. Продолжение – модификация протоколов квантовой криптографии с учетом атак, связанных с не строгой однофотонностью источника иформационных состояний. Пример – метод с состояниями ловушками (Decoy State метод).  Лекция 16. Связь квантового критерия секретности, основанного на следовом расстоянии, с критерием Шеннона, основанном на сложности перебора ключей.  Лекция 17. О квантовых генераторах случайных чисел. Источники квантовой случайности, методы пост обработки – извлечения случайности. Примеры реализации.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=929747');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (305, 'Управление проектами в современной компании
', 'online.edu.ru', '   Основы методологии управления проектами  Система менеджмента проектной деятельности  Корпоративный стандарт управления проектами  Управление содержанием проекта  Календарно-ресурсное планирование  Управление проектными отклонениями  Управление стоимость и финансированием проекта  Управление заинтересованными сторонами проекта  Управление командой проекта  Корпоративная система управления проектами   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979690');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (306, 'Основы критического мышления
', 'online.edu.ru', '  Раздел 1. Психология критического мышления   Что такое критическое мышление?  Зачем уметь мыслить критически?  Враги эффективного мышления  Формирование критического склада ума  Методы развития критического мышления   Раздел 2. Эффективная работа с информацией   Связь критического мышления с логикой, риторикой, теорией аргументации  Теория аргументации  Структура доказательства  Основные приемы опровержения  Методы защиты от манипуляций  Тактика убеждения   Раздел 3. Критическое мышление и процесс принятия решений   Инструментарий для принятия решений  Модели принятия решений: индивидуальные и коллективные  Решение проблем  Решение задач   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979691');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (307, 'Основы дизайна
', 'online.edu.ru', '  Зачем специалисту дизайн   Где сегодня работает дизайн и что представляет собой проектное мышление  Что может дизайн  Что создают дизайнеры и только они   Начала дизайн-проектирования   Предпроектный анализ: целевая аудитория  Предпроектный анализ в дизайне: контекст и бюджет  Критерии оценки дизайна   Проектируем сами   Выбор предмета проектирования  Разработка формы продукта  От эскиза к реализации   Представление и защита проекта в дизайне   Как представить ваш дизайн-продукт  Где вам пригодятся навыки дизайна   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979692');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (308, 'История: 5 подходов к историческому развитию
', 'online.edu.ru', '  Модуль 1. История. Войны Тема 1. Конец старого мира. Первая мировая  Тема 2. Теория фронтира Тема 3. Война как движущая сила цивилизации Тема 4. Возможности и ограничения использования данного подхода в исследовании  Модуль 2. Исторический материализм К. Маркса Тема 1.Общественно-экономическая формация: эволюция свободы Тема 2.Критика марксизма: «идеальная» модель капиталистической Англии и «неидеальный» азиатский способ производства Тема 3.Марксизм после К. Маркса: ответ критикам исторического материализма  Модуль 3. Спиральная динамика Тема 1.Концептуальные модели мира в истории Тема 2.Этапы развития обществ: индивидуализм и коллективизм Тема 3.Применение теории спиральной динамики для интерпретации истории Тема 4.Применение теории спиральной динамики для объяснения социальных процессов и жизненной истории человека Тема 5.Возможности и ограничения использования данного подхода в исследовании  Модуль 4. Теория Л.Н. Гумилева Тема 1. Время всемирной и время этнической истории Тема 2. Этнос как субъект всемирной истории Тема 3. Как формируется этническая идентичность Тема 4. Пассионарность Тема 5. Фазы этногенеза Тема 6. Теория Гумилева между естественными и гуманитарными науками  Модуль 5. Субъективистский подход Тема 1.Роль личности в истории: разные точки зрения  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979693');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (309, 'Личная безопасность
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979694');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (311, 'Основы предпринимательства для неменеджеров
', 'online.edu.ru', '  1. Природа предпринимательства  2. Поиск предпринимательской возможности  3. Предпринимательское и креативное мышление  4. Бизнес-моделирование  5. Первичная оценка рынка  6. Тестирование и корректировка бизнес-модели  7. Поиск и привлечение ресурсов  8. Легализация бизнеса  9. Презентация проекта инвестору  10. Финансовые показатели проекта  11. Тайм-менеджмент  12. Внутрифирменное предпринимательство  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979696');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (312, 'Мозг и психика
', 'online.edu.ru', '   Введение в когнитивную науку и нейронауку.  Методы нейронаук. Строение мозга.  Мозг и психика. Современное состояние психофизической и психофизиологической проблемы. Психофизиология сознания.  Мозговая организация восприятия.  Мозговая организация внимания.  Мозговая организация памяти.  Мозговая организация эмоций.  Мышление, принятие решений и мозг.  Индивидуальные различия и мозг.  Психофизиология сна.  Социальный мозг.  Моторная система.  Психофизиология речи.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979697');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (313, 'Цифровая история
', 'online.edu.ru', '   Введение. Что такое цифровая история?  Кодирование и моделирование исторической информации. Данные в истории  Исторические информационные системы и базы данных  Анализ и цифровые издания исторических текстов  Сетевое моделирование исторических данных  Пространственный анализ и визуализация исторических данных  Математические методы в исторических исследованиях  Цифровые методы работы с аудиовизуальными источниками и материальными объектами  (Цифровая) история за пределами академии   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979698');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (314, 'Экономическая психология
', 'online.edu.ru', '   Введение в экономическую психологию  Экономическая социализация  Психология денег и кредитные карты  Психология потребительского поведения  Психология рекламы  Предметы первой необходимости и предметы роскоши  Бедность и богатство  Трудовая мотивация  Безработица  Предпринимательская мотивация. Уплата налогов   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=979699');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (315, 'Анализ фильма
', 'online.edu.ru', '   1. Изобретение кинематографии   • Простейшие техники получения и проецирования изображения. Получение изображения: камера-обскура. Проекция изображения: волшебный фонарь. Статические оптические иллюзии: Анаморфозы.  • Изобретение иллюзии движения. Фенакистископ Жозефа Плато (1832). СтробоскопСимона фон Штампфера (1833). Коммерциализация изобретения.  • Оптические эффекты, лежащие в основе кинематографа. Lilac chaser («исчезающие круги»). Фи-феномен. Бета-движение. Персистенция. Эффект Трокслера.  • Дальнейшая эволюция иллюзии движения. Зоотроп. Технология проецирования: кинетоскоп. Кинеограф. Праксиноскоп и «Оптический театра» Эмиля Рейно. Хронофотография Эвдарда Мейбриджа и последние шаги к кинетоскопу Эдисона.  • Изобретение фотографии. Гелиография. Гелиогравюра. Калотипия. «Карандаш природы» Уильяма Тальбота. Дагеротипия. Портретная фотография. Коллодионный процесс. Фотографии Крымской войны Роджера Фентона (1855). Желатиносеребряный фотопроцесс. Объективы.  • Кинематограф. Кинетограф Уильяма Диксона и Т. Эдисона. Кинетоскоп. Студия «Черная Мария». Кинетоскопический кабинет. Конкуренты кинетоскопа: мутоскоп. Триумф студии Байограф (1895-1916). Российские разработки: Иосиф Тимченко. Синематограф братьев Люмьер.   2. Краткая история развития кинематографа   • Раннее кино: рекомендуемые фильмы. Луи и Огюст Люмьеры. Жорж Мельес. Фильмы студии Томаса Эдисона. Джордж Альберт Смит и Брайтонская школа. Девид Уорк Гриффит (короткометражные фильмы).  • Первые годы. Рождение кинокритики. Кино как иллюзия и аттракцион. Иллюзионистский след в современном кинематографе.  • Театрализация кино. Жорж Мельес. Кино и рождение французских интеллектуалов. Политизация и инсценированная хроника. Неизвестный житомирский фильм о деле Дрейфуса. Инсценированные новости.  • Зарождение кинематографа в России. Первый российский игровой фильм. Рост популярности кино. Первые годы российского кинопроизводства.  • Монтаж. Значение монтажа. Потребность в усложнении фильмов. Рождение монтажа из задач кинохроники. Эффект смены планов. Линейный монтаж. Фильмы-погони. Параллельный монтаж. Классика монтажного кино.  • Киноповествование. «Девушка из Сибири». Проблема ясности и связанности киноповествования. Классический «голливудский» нарратив. Появление больших жанров.  • Документирование ранней истории кинематографа. Лакуны в истории кино. Миллион в никуда. Киноархивы в России.  • Дальнейшая техническая эволюция кинематографа. Звуковое кино. Цветной кинематограф. Ранние теоретики кино против звука и цвета. Любительское и малобюджетное кино. Влияние войн. Телевидение. Цифровой кинематограф. Компьютерная графика. Цифровой звук. Трехмерное кино. Цифровое теле- и мультимедиа вещание. Влияние современной цифровой и сетевой медиа-среды на киноиндустрию.   3. Инфраструктура индустрии кино   • Организованные формы и практики просмотра кино. Ярмарочное кино. Советский агитпоезд. Автокинотеатр. Стационарный кинотеатр. «Дворец кино». Переход к стационарным кинотеатрам. Посещаемость кинотеатров в 1938 году. Эпоха видеосалонов и контрафакта. Кино в цифровой медиа-среде. Попкорн.  • Как смотрят кино в России сегодня. Интенсивность просмотра фильмов. Практики просмотра кино. Культурно-страновые предпочтения. Жанровые предпочтения.  • Кино как экономическая индустрия. Золотая жила братьев Люмьер. Киноимперия «Пате». Структура киноиндустрии.  • Краткая история Голливуда. «Золотая эра». «Фабрика звезд». Первая кинозвезда - «девушка Байографа». «Новый Голливуд». Причины кризиса классической системы студий. «Новая волна» и теория авторского кино. Особенности «нового Голливуда». Конец «нового Голливуда» и начало «эпохи блокбастеров». Серийные блокбастеры.  • Кино и политика. Кино и рождение французских интеллектуалов. Кино и пропаганда. Кино в СССР. Кино и церковная политика.  • Кино и цензура. Введение цензуры. Кодекс Хейса. Общие принципы кодекса Хейса. Области применения Кодекса. Обоснование положений Кодекса. Некоторые положения Кодекса. Причины отказа от кодекса Хейса.   4. Метаморфозы кинематографа: ранний период   • Экспериментальное кино: музыкальная модель фильма. Киноавангард. «Абсолютное кино». «Визуальная музыка». «Звукозрительный ряд» С. Эйзенштейна. Люмиграф.  • Кино в авангардистских художественных течениях 1920-х гг. Дадаизм. Сюрреализм. Разрушение нарратива в киноавангарде. Наследие киноавангарда в современном кино. Коды и штампы киноавангарда. Значение психоанализа.  • Городская документалистика. Классические фильмы. Берлин: Симфония большого города (Вальтер Руттман). Человек с киноаппаратом (Дзига Вертов). По поводу Ниццы (Жан Виго). Другие фильмы Жана Виго (1905-1934). Тотальный взгляд кинооператора (Вертов). Трансформация пространства.  • Архитектурная эстетика и городская антиутопия. «Метрополис» (1927). «Город рабочих». «Орнамент масс». «Верхний город». «Новая вавилонская башня». Гётенаум Рудольфа Штайнера (1923-1927). Собор. «Клуб сыновей». «Город мертвых». Уровень машин. Влияние на последующий кинематограф. Многоуровневые пространства. Традиция архитектурной антиутопии.  • Экспрессионизм и психологизм раннего немецкого кинематографа. Классические фильмы. Рефлексивность. Пражский студент (Стеллан Рюэ, Пауль Вегенер). Послевоенная интровертность. Кабинет доктора Калигари (Роберт Вине). «Калигари» как социальный диагноз. Значение немецкого киноэкспрессионизма.   5. Кино как предмет анализа   • Ранний период исследований кино. Психология восприятия фильма. Литературоцентризм ранних теоретиков кино. Монтаж как язык. Теоретическая рефлексия советских режиссеров. Психологический анализ фильма. Феноменологический анализ фильма. Социально-психологический анализ фильма. Значение кинокритиков.  • Современные подходы. Обзорные работы. История кино. Семиотические подходы к анализу фильма. Синтагматика кинонарратива К. Метца. Психоаналитические подходы к анализу фильма. Кристиан Мец: первичная и вторичная идентификация. Структурализм и постструктурализм. Кино во французском постструктурализме. Феминистическая критика кинематографа. Феноменологический холизм. Структурно-морфологический анализ фильма. Исследование кино как социального мифа. Системный киноанализ. Доминирование субъективизма.  • Основные измерения анализа фильма. «Язык самой жизни». Кино как «Gesamtkunstwerk». Измерения анализа фильма. Данная реальность фильма. Исторический контекст создания данного фильма. Исторический контекст производства фильма. Воздействие фильма на аудиторию. Значение исследований рецепции. Исторический анализ восприятия фильма.  • Кино-коды: эволюция и разночтения. Базовая модель коммуникации. Кинематографические коды. Пример собственного кинематографического кода. Эволюция субъекта и кино-кодов. «Девушка из Сибири». Отзывы современников на фильмы Вертова. «Бойня» в финале фильма «Стачка». Конфликт интерпретаций. Кинематограф и процесс урбанизации.  • «Основная модель» имманентного анализа фильма. Фильм как самостоятельная реальность. Четыре ключевых вопроса. Сюжет и фабула. Классические элементы сюжета. Структурный анализ сюжета. Время в кинематографе. Пространство в кинематографе.   6. Формальный анализ фильма   • Элементы фильма. Основные понятия. Кадр. Эволюция кадра. План. Сцена – эпизод - часть. Тип (крупность) плана. Дальний план. Эффект смены планов в раннем кинематографе. План как изобразительный прием.  • Монтаж. Значение монтажа. Смысловая работа монтажа. Русская рефлексия американского монтажа. Актер в театре и кино. Русский и американский монтаж.  • Приемы монтажа. Внутрикадровый монтаж. Современные классификации монтажа. Пример: монтажный наплыв. Эффекты Льва Кулешова. Раскадровка: схема последовательности планов в сцене.  • Примеры монтажа. Типы монтажа по С. Эйзенштейну:«ритмический» и «интеллектуальный» монтаж. Эволюция постановки боевых сцен.  • Протоколирование фильма. Типы протоколирования (Гельмут Корте). Графы протокола (скрипта) фильма. Пример протокола планов. Пример протокола эпизодов. Пример графика длительности эпизодов. Пример графика частоты склеек. Схема полного системного анализа фильма.  • Жанры кино. Понятие жанра. Жанры раннего кинематографа. Основные современные игровые жанры.   7. Семантика и феноменология фильма   • Базовые понятия семиотики и семантики . Типы знаков. Перформативная функция знаков. Двухчастная семантическая модель. Трехчастная семантическая модель: треугольник Готлоба Фреге. Коннотация.  • Семантика визуальных образов . Смысл как способ данности предмета. Смысл как ракурс предмета. Предметная неопределенность смысла. Бесконечность смысловых ракурсов. Смысловые ракурсы в кино.  • Феноменология опыта кинозрителя . Современные представители. Жан-Пьер Мёнье: структуры опыта кинопросмотра. Рудольф Арнхайм: «частичная иллюзия» фильма. Вивиан Собчак: темпоральные типы сознания фильма.Феноменологический холизм. Принципы феноменологического холизма. Феноменология и анализ.  • Феноменологическая эстетика Романа Ингардена . Двухмерность литературного произведения. Конституируемые слои произведения. Пример: анализ сонета Адама Мицкевича. Материальный слой. Смысловой слой. Интенциональность сознания. Смысл как интенциональная структура сознания. Ноэза и ноэма. Полное восприятие литературного произведения и работа воображения.  • Феноменология живописи и кино . Восприятие картины. Различие в конституировании восприятия литературного произведения и картины. Экранизации литературных произведений и пределы фантазии Беспредметная живопись. Феноменологическая специфика фильма. Трансформация смысла переменой ракурса. Легкость восприятия, эффективность воздействия и вмененный зрителю вуайеризм. Критика «технического взгляда».  • Фильм как окно и фильм как рама . Окно и рама. Монтаж vs. Мизансцена. Критика монтажного кино. Интенции монтажного кино. Искусство мизансцены. Критика данной оппозиции. Возражение на критику. Некорректность оппозиции: герменевтическая специфика фильмов Роберта Флаэрти. Уточнение оппозиции.   8. Вестерн   • Анализ жанров . Выбор жанра для анализа (%). Особенности анализа жанрового кино. Структурный анализ жанра.  • Мир вестерна . Вестерн как исключительный киножанр. Ковбой и социальный миф Запада.  • Исторические контексты . Понятие фронтира. Гомстед-акт. Приключенческая литература. Вестерн в литературе. Ф. Дж. Тёрнер: «тезис о фронтире» (1893). Образ ковбоя в американской политике. Кантри-музыка. Вестерн и американский пейзаж.  • Краткая история жанра . Первые образцы и первая звезда вестерна. Звезды золотой эпохи Голливуда. Комедийный и пародийный вестерн. Социальная критика и делигитимация жанра. Спагетти-вестерн. Метаморфозы жанра: роад-муви. Современный вестерн: гендерная и этническая либерализация канонических ролей. Современный вестерн: система цитат из классических фильмов. Фронтиры других стихий.  • Структура классического вестерна . Структурно-морфологический анализ. Классический сюжет. Классические вестерны. Структура классического сюжета (У. Райт). Фабульные вариации.  • Вариации классического сюжета . Вариация на тему возмездия. Структура вестерна с темой возмездия. Вестерн с переходной темой. Профессиональный сюжет. Структура профессионального сюжета.  • Социально-теоретический фундамент вестерна . Кино как социальный миф. Великолепная семерка социальной теории. Вестерн по Гоббсу. Локк: естественное состояние и его закон. Свобода и равенство. Право на насилие. Труд – источник права собственности. Естественные границы размера собственности. Естественный собственник – мелкий фермер. Американский фронтир как идеальное естественное состояние. Денежный капитал как угроза естественному состоянию собственности. Границы свободы и договор. Общественный договор: переход к политическому и гражданскому обществу. США как страна фронтира и мелких фермеров. Гражданское состояние общества модерна.  • Кризис фронтира: индустриальный капитализм . Карл Маркс: открытие структурного неравенства. Запад и Восток. Фронтир как альтернатива структурному неравенству. Ковбои революции. Другие способы решения проблемы. Дискурсы новых фронтиров.  • Капитализм и мораль . Фермеры и крупный капитал. Проблема источника морали. Роль женщины в вестерне. Эмансипация и рефлексия женской роли в современном вестерне.   9. Анализ жанров   • Боевик. Жанр эпохи неолиберализма. Голливуд и политическая повестка дня. Боевик и рейганизм. Типология боевика. Классический (картезианский) боевик. Полицейский боевик. Психологический боевик (боевик возмездия). Структурный анализ классического сценария. Социально-правые источники жанра.  • Гангстерское кино. Социальный реализм и критика. Насилие в фильмах до введения кодекса. Моральный выбор. Репертуар моральных ролей. Роль женщины и разделение сфер. Самоуничтожение зла. Новый Голливуд. Современность.  • Детектив . Популярность жанра. Расколдованный мир. Детектив как носитель модерновой рациональности. Буржуазный мир вещей. Мир горожанина. Советский буржуа. Шерлоки других профессий. Дедуктивный метод? Шерлок как историк. Метод понимающей исторической герменевтики. Эпистемологическая самоуверенность. Критика классической герменевтики в современных детективах.  • Мюзикл. Раскрытие возможностей звукового кино. Лоис Вебер: моральная и социальная проблематика американского кино. Американское общество, община и ассимиляция. Мюзикл золотой эпохи Голливуда. Советский мюзикл. Современный российский мюзикл. Болливуд. Идеология современного американского мюзикла. «Американская мечта». Критика «американской мечты».   10. Фильмы ужасов и сериалы   • Фильмы ужасов: общие особенности . Популярность жанра. Исследования. Иррационализм в эпоху детективов. Магия и новые медиа. Жанр без структуры. «Непреодолимое очарование ужаса».  • Негативное и грандиозное в эстетике романтизма . Негативное возвышенное и интенсивность эмоции. Возвышенное и грандиозное. Романтическое понятие возвышенного. Диалектика господина и раба.Личность и смерть. «в борьбе не на жизнь, а на смерть». Гимн чуме. Эротизация романтизма.  • Становление жанра: 1920-30-е . Значение немецкого киноэкспрессионизма. Беспомощный зритель внутри сна героя. Монстр: голливудская версия хоррора. Чудовищный монстр с обаянием.  • Развитие жанра: 1940-90-е . Хоррор в повседневности. «Женская готика». Фантастический хоррор. Интерактивный хоррор. Альфред Хичкок. Джалло (giallo). Слэшер. «Найденная пленка».  • Философия страха и ужаса: Мартин Хайдеггер . Страх как модус человеческого существования. Чего мы боимся? За что мы боимся? Вариации переживания страха. Страх как фундаментальная человеческая предрасположенность. Культур-социологическая релятивизация.  • Ужас, ничто и одиночество . Ужас как условие возможности страха. Неопределяемость ужаса. Одиночество и свобода.  • Типы кинематографического страха . Эстетизация страха. «Частичная иллюзия». Кино и философия. Пугающее воображение. Сильный испуг. Озабоченная антиципация. Тревожное возбуждение. Устрашающая привлекательность.  • Сериалы . Формальная структура. Триумф сериалов. Семиотическая тождественность кино и реальности. Сериалы как «часть жизни».  • Сон или реальность? Проблема демаркации. Сон философа. Радикализм феноменологического эпохэ  • Фиктивность реальности и реальность фикции . Философские традиции фикционализации реальности. Фикция как реальность: Дильтей. Действительность и фикция: Марквард. Кино как путешествие. Другие способы преодоления фиктивности.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980380');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (317, 'Введение в искусственный интеллект
', 'online.edu.ru', '   Введение в искусственный интеллект  Введение в машинное обучение  Машинное обучение в задачах классификации  Введение в машинное обучение: кластеризация и визуализация данных  Введение в теорию вероятностей  Введение в математическую статистику  A/B тестирование  Основы визуализации данных  Введение в нейронные сети  Нейронные сети в задачах распознавания изображений  Нейронные сети в задачах стилизации изображений  Другие задачи искусственного интеллекта: рекомендательные системы и ассоциативные правила   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980382');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (324, 'Качественные методы в социологическом исследовании
', 'online.edu.ru', '   Качественное исследование в социальных науках: методологические основания  Дизайн качественного исследования  Этнографическая стратегия и участвующее наблюдение  Интервью в качественном исследовании  Фокусированное групповое интервью (фокус-группы): особенности организации и проведения  Качественный анализ данных: общий обзор  Биографический метод  Кейс-стади  Оценка и презентация результатов качественного исследования и жанры качественного письма  Этика качественного социологического исследования   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980389');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (318, 'Современные информационные технологии в бизнесе
', 'online.edu.ru', '   Информация, информационные системы и информационные технологии. Информатизация общества. Влияние ИТ на бизнес.  Современные информационные технологии. Технологии больших данных.  Современные информационные технологии. Облачные вычисления.  Современные информационные технологии. Интернет вещей  Современные информационные технологии. Технологии Blockchain  Современные информационные технологии. Технологии искусственного интеллекта  Задачи и место ИТ подразделения в деятельности компании. Понятие ИТ-инфраструктуры предприятия. ИТ-аутсорсинг.  Корпоративные информационные системы. КИС управления ресурсами предприятий. ERP-системы.  КИС управления взаимоотношениями с клиентами. Обзор CRM-систем.  КИС управления электронным документооборотом, ECM-системы.  Интеллектуальный анализ данных. КИС управления знаниями. BI-системы. Системы поддержки принятия решений. Экспертные системы  Электронная экономика, электронный бизнес, электронный маркетинг и электронная коммерция   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980383');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (319, 'Управление ИТ-проектами
', 'online.edu.ru', '   Базовые понятия управления проектами  Отличительные особенности и факторы успеха ИТ-проектов.  Выбор жизненного цикла ИТ-проекта. Использование гибких подходов в управлении ИТ-проектами.  Стандарты управления проектами  Инструменты управления ИТ-проектами  Управление содержанием и сроками ИТ-проектов.  Управление человеческими ресурсами и коммуникациями ИТ-проекта.  Управление рисками ИТ-проектов  Оценка эффективности ИТ-проектов.  Контроль хода выполнения ИТ-проекта и управление изменениями.  Особенности управления компаниями, выполняющими контрактные ИТ-проекты  Управление портфелем ИТ-проектов.  Автоматизированная корпоративная система управления проектами   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980384');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (320, 'Макроэкономика
', 'online.edu.ru', '   Введение в макроэкономическую теорию  Измерение совокупного выпуска и совокупного дохода  Равновесие товарного рынка в двухсекторной экономике  Равновесие товарного рынка в трехсекторной и четырехсекторной экономиках  Фискальная политика  Равновесие денежного рынка  Монетарная политика  Равновесие рынка труда и совокупное предложение  Модель совокупного спроса – совокупного предложения  Макроэкономическая политика в закрытой экономике  Безработица  Инфляция  Кривая Филлипса  Экономический рост  Открытая экономика  Макроэкономическая политика в открытой экономике   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980385');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (321, 'Философия: расширенный курс
', 'online.edu.ru', '   Что такое философия?  Досократики  Сократ, Платон, Аристотель  Эллинизм  Средние века  Возрождение  Новое время  Немецкая классика  19 век: основные направления.  20 век: основные направления  Этика.Философия сознания  Политическая философия.Философия искусственного интеллекта  Философия языка. Философия истории  Философия науки.Континентальная философия  Философия искусства. Философия религии   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980386');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (323, 'Психология личности и индивидуальных различий
', 'online.edu.ru', '   Предмет и методы психологии индивидуальных различий  Факторы развития индивидуальности и ее структура  Индивидные свойства: асимметрия полушарий и темперамент  Психология характера  Психология способностей  Типологический подход к индивидуальности  Черты личности  Психология пола  Духовно-мировоззренческие аспекты индивидуальности  Интегральные характеристики индивидуальности   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980388');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (325, 'Риторика: ключевые стратегии устной и письменной коммуникации
', 'online.edu.ru', '   Риторика: основные понятия.  Структура устного выступления. Античный и современный взгляд на композицию.  Деловая риторика: презентации и дебаты  Недобросовестное речевое воздействие и противостояние ему  Метафора в языке и тексте  Устная и письменная речь, правила «перекодирования»  Литературная речь. Стилистические ресурсы и их использование  Композиция письменного текста. Структура и функции абзаца  Функциональные стили: специфические черты, выразительные средства, различия в способах аргументации  Академическая письменная речь   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980770');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (326, 'Методика преподавания РКИ
', 'online.edu.ru', '  1. Особенности дистанционного обучения РКИ (В1+, В2)  (д. филол. наук, проф. Татьяна Игоревна Попова)   2. Интерактивные формы обучения РКИ: мифы и реальность  (  д. пед. наук, доц.   Нина Леонидовна Федотова)   3. Средства обучения аудированию (в аспекте РКИ)  (канд. пед. наук, доц. Ирина Александровна Гончар)   4. Тестологическая компетенция преподавателя РКИ  (канд. пед. наук, доц. Инна Николаевна Ерофеева)    5. Содержание обучения РКИ в учебном пособии «Русский язык: Первые шаги» (уровень А2)  (канд. пед. наук, доц. Любовь Григорьевна Беликова)   6. Лингвометодические основания современного учебного пособия по русскому языку как иностранному для продвинутого этапа обучения (на примере учебного пособия Л.Ю. Скороходова и О.В. Хорохординой «Окно в Россию»)  (канд. филол. наук, доц. Ольга Витальевна Хорохордина)   7. Чистая грамматика: учебник и проблемы обучения  (канд. филол. наук, доц. Елена Ромуальдовна Ласкарева)   8. Аудитивный компонент учебных игровых фильмов (в аспекте РКИ)  (канд. пед. наук, доц. Ирина Александровна Гончар)   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980773');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (327, 'Функционирование русского языка в странах СНГ и национальных республиках РФ
', 'online.edu.ru', '   Модуль 1. Русский язык в странах Содружества Независимых Государств: правовой статус и функционирование   Лекция 1. Правовой статус русского языка в странах СНГ. Лекция 2. Владение русским языком в странах СНГ. Лекция 3. Основные сферы функционирования русского языка в странах СНГ. Лекция 4. Мероприятия, направленные на популяризацию русского языка в странах СНГ. Экзаменационное задание: написать эссе не тему «Русский язык в странах СНГ: основные вызовы и точки роста».  Модуль 2. Русский язык в образовательном пространстве стран СНГ   Лекция 1. Русский язык в системе дошкольного и школьного образования стран СНГ. Лекция 2. Русский язык в высшей школе стран СНГ. Лекция 3. Деятельность национальных объединений русистов стран СНГ. Экзаменационное задание: Вы – проректор по международным связям российского вуза. Составьте концепцию продвижения вашего вуза в страны СНГ, используя знания, полученные в ходе изучения модуля.  Модуль 3. Русский язык в общественной жизни стран СНГ   Лекция 1. Русскоязычные издательства в странах СНГ. Лекция 2. Русскоязычные СМИ в странах СНГ. Лекция 3. Российский кинопрокат в странах СНГ. Экзаменационное задание: проанализируйте сайты русскоязычных издательств и СМИ в странах СНГ и составьте концепцию поддержки этих организаций со стороны России.  Модуль 4. Русский язык в национальных республиках Российской Федерации: правовой статус и функционирование   Лекция 1. Количественный и качественный состав владеющих русским языком в республиках РФ. Лекция 2. Сферы функционирования русского языка в национальных республиках РФ. Лекция 3. Миграционные процессы в национальных республиках (на примере тюркоязычных и финно-угорских языковых групп). Лекция 4. Мероприятия, направленные на популяризацию русского языка в национальных республиках РФ. Экзаменационное задание: написать эссе «Русский язык в современной социолингвистической ситуации в национальных республиках РФ».  Модуль 5. Русский язык как государственный в системе образования в национальных республиках РФ   Лекция 1. Дошкольные учреждения с изучением русского языка: структура, формы, методики. Лекция 2. Школьное образование с преподаванием (полностью или частично) на русском языке. Углубленное изучение русского языка в школах. Лекция 3. Функционирование русского языка в высшей школе. Лекция 4. Развитие вузовской русистики в республиках РФ. Экзаменационное задание: написать эссе на тему «Русский язык в системе образования в национальных республиках РФ».  Модуль 6. Русский язык в общественной жизни национальных республик РФ   Лекция 1. Деятельность национальных объединений русистов в республиках. Лекция 2. Русский язык как государственный язык в СМИ. Лекция 3. Русский язык как язык культуры в национальных республиках РФ. Лекция 4. Литература на русском языке в республиках РФ. Экзаменационное задание: написать эссе на тему «Русский язык в общественной жизни республики (на примере одной или двух республик)».  Модуль 7. Вариативность обучения   Лекция 1. Мы учим русскому языку всех одинаково или по-разному? Лекция 2. Зависит ли вариативность обучения от условий обучения? Лекция 3. Зависит ли вариативность обучения от особенностей учащихся (языковых, образовательных, возрастных, индивидуально-типологических)? Лекция 4. В чем выражается индивидуальный стиль учебной деятельности? Экзаменационное задание: напишите эссе о своем опыте изучения родного/иностранного языка.  Модуль 8. Основные направления в лингводидактике   Лекция 1. Что такое методическая концепция? Лекция 2. Особенности языкового направления в лингводидактике. Лекция 3. Особенности коммуникативного направления в лингводидактике. Лекция 4. Особенности культуроведческого направления в лингводидактике. Экзаменационное задание: напишите эссе на тему «Нужно ли знать теорию языка, чтобы овладеть им практически?»  Модуль 9. Языковое или лингвистическое направление в лингводидактике   Лекция 1. Как обучают нерусских детей русскому произношению? Лекция 2. Как обучают нерусских детей русскому правописанию? Лекция 3. Как сформировать у нерусских детей лексические навыки? Лекция 4. Как обучать нерусских детей русской грамматике? Экзаменационное задание: Напишите эссе о трудностях, которые Вы испытывали при изучении грамматики иностранного языка, и том, как Вы их преодолевали.  Модуль 10. Речевое или коммуникативное направление в лингводидактике   Лекция 1. Как обучать нерусских детей аудированию? Лекция 2. Как обучать нерусских детей чтению? Лекция 3. Как обучать нерусских детей говорению? Лекция 4. Как обучать нерусских детей письму? Экзаменационное задание: напишите эссе о своем опыте овладения речью на неродном/иностранном языке.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980774');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (328, 'Трехмерная визуализация
', 'online.edu.ru', '   Принципы освещения в реальности и перенос в виртуальное пространство.  Материаловедение. Как свет взаимодействует с различными материалами.  Алгоритмы построения сложных материалов.  Использование текстур для создания материалов.  Изучение алгоритмов просчета освещения в сцене для получения реалистичной визуализации.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980776');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (329, 'Психология предпринимательства
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:   Введение. Для чего этот курс? Что освоим в теории и что сделаем на практике  Что такое счастье и успешная жизнь: научный взгляд  Как вы можете сделать собственную жизнь лучше с помощью разума и научных знаний  Ресурсы успешности: профессиональное мышление  Ресурсы успешности: конструктивное сотрудничество  Ресурсы успешности: ориентация на свои интересы в профессиональной области  Ресурсы успешности: развитие своих возможностей  Предпринимательство в условиях цифровой экономики  Профессии будущего – какие специалисты будут востребованы в цифровой экономике  Моя образовательная траектория. Критерии оценки компетенций 21 века   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980777');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (330, 'Жизненная навигация
', 'online.edu.ru', '  1. Мечта как жизненные стремления личности. Для того, чтобы двигаться по своему жизненному пути осознанно, важно понимать, к чему мы идем. Яркая картинка того, чего вы хотите, будет наполнять смыслом все дальнейшие действия.  2. Дерево жизненно важных целей. Дерево средне- и краткосрочных целей немного заземляет наши мечты, показывает направление, в котором мы можем двигаться, если хотим прийти к их исполнению. Кроме того, дерево целей может включить в поле рассмотрения сферы жизни, которые не отражаются в мечте напрямую, но являются важными для нас.  3. Ресурсы. Для достижения целей нужны ресурсы (внешние и внутренние), поэтому важно составить список необходимых ресурсов, провести анализ имеющихся, найти пути для получения и замещения недостающего. Программа курса нацелена на работу не только с внешними ресурсами (такими как финансы или время), но и с внутренними, помогает разобраться с тем, какие качества личности необходимы для достижения целей и определиться с тем, насколько они развиты.  4. Связь личностных качеств с компетенциями, необходимыми мне как профессионалу для поиска возможностей внутри университетской жизни для своего профессионального роста.  5. Программа саморазвития. План действия по достижению своих целей, который отвечает на вопросы: что я могу сделать прямо сейчас (или в ближайшее время) для достижения своей мечты, какие действия предпринять, какие привычки начать выращивать, что приблизит меня к достижению цели?  6. Помехи. Необходимо заранее произвести анализ возможных помех, продумать их профилактику, вспомнить прецеденты, когда нам удавалось аналогичное действие, понять, какие последствия могут возникать, если профилактика не сработает и, наконец, найти альтернативы.  7. Я-идеальное. У каждого есть представление о себе идеальном. Для большинства это представление служит стимулом к росту, подталкивает становиться лучше (по данным самоанализа студентов, прошедших курс в ИТМО, таких – 94%). Но бывает и так, что представление о себе идеальном настолько далеко от реального образа Я, что вместо поддержки, парализует действия. Кроме того, именно на студенческом этапе жизни Я-идеальное претерпевает серьезные изменения, с чем необходимо работать.  8. Карта спутников (референтных, значимых лиц). На этом этапе важно вспомнить, что мы в мире не одни. И любая дорога будет проще, если мы найдем союзников. Конечно, любое взаимодействие – процесс двусторонний, поэтому при составлении карты значимых лиц стоит продумывать не только, что вам нужно от них, но и что может быть нужно им от вас. А когда вы определитесь с тем, кто и чем может вам помочь, останется их только убедить.  9. Ежедневные и регулярные дела. Именно то, что ты регулярно делаешь сегодня, определяет твое завтра. Для управления временем очень полезно использовать приемы тайм-менеджмента и нарабатывать высокоэффективные привычки.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980778');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (331, 'Программирование и разработка веб-приложений. Часть 2
', 'online.edu.ru', '  В курсе рассматриваются следующие темы:    Использование регулярных выражений    Скрапинг с испрользованием BeautifulSoup    Многопоточные и многопроцессорные возможности Python    Работа с реляционными базами данных (SQLite, MySQL, PostgeSQL)    Работа с не реляционными базами данных (MongoDB)    Разработка приложений с использованием Flask    Разработка приложений с использованием Django (часть администратора)    Разработка приложений с использованием Django (данные, видимые пользователям), авторизация и использование форм    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=980779');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (386, 'Ракетные двигатели
', 'online.edu.ru', '   Модуль 1.Знакомство с ракетными двигателями. Реактивное движение в природе и технике. Классификация реактивных двигателей. Области применения ракетных двигателей. Уравнение сохранения импульса. Формула Циолковского.   Модуль 2. Знакомство с ракетными двигателями. Классификация ракетных двигателей. Принцип работы ракетных двигателей. История ракетных двигателей.   Модуль 3.Принцип работы ракетных двигателей.    Модуль 4. Жидкостные ракетные двигатели. Классификация ЖРД. Принцип работы ЖРД с вытеснительной подачей топлива. Принцип работы ЖРД с насосной подачей топлива. Жидкие ракетные топлива.   Модуль 5. Ракетные двигатели твердого топлива. Принципы работы РДТТ. Гибридные ракетные двигатели. Твердые ракетные топлива.   Модуль 6. Электрические ракетные двигатели. Принципы работы. Электромагнитные РД. Электростатические РД. Источники энергии для ЭРД.   Модуль 7. Ядерные ракетные двигатели. Принцип действия ЯРД. Опытные разработки ЯРД. Импульсный взрывной ядерный двигатель.  Модуль 8. Комбинированные ракетные двигатели. Классификация воздушно-реактивных двигателей. Принцип работы ВРД. Ракетно-турбинные двигатели. Ракетно-прямоточные двигатели. Турбопрямоточные двигатели.   Модуль 9. Перспективы развития ракетных двигателей и топлив. Гибридные ракетные двигатели. Детонационные ракетные двигатели. Пути совершенствования ракетных топлив.   Модуль 10. Итоговое тестирование.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=11042087');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (332, 'Основы разработки игр на Unity
', 'online.edu.ru', '   Тема 1. Введение в разработку игр   Основы разработки игр. Обзор редактора Unity. Проекты, сделанные с помощью Unity. Создание игр в режиме 2D и 3D. Создание игр без навыка в программировании.   Тема 2. Работа в редакторе Unity   Установка Unity. Интерфейс Unity. Настройка рабочего пространства. Работа с ассетами. Примитивные модели.   Тема 3. GameObjects. Физика. Скриптинг   Игровыеобъекты GameObjects. Шаблоны игр от Unity. Создание 2D игры за 10 минут. Физика в Unity 2D. Скриптинг.   Тема 4. Начало создания 2D игры - Space Attack   Создание фона для игры. Космический корабль. Написание скрипта. Управление игровым объектом. Рефакторинг кода.   Тема 5. Экзамен и практика    Тема 6. Работа с лазером   Настройка лазера. Взаимодействие с объектами. Уничтожение объекта. Пустой трансформ. Контроллер на сцене. Скрипт движения. Ускорение.   Тема 7. Объект Enemy   Поведение Enemy. Уничтожение объекта. Попадание через коллизию. Поведение объектов при взрыве. Уклонение от нападений.   Тема 8. Создание пользовательского интерфейса   Знакомство с Unity UI. Установка UI Manager. Отображение количества очков. Окно перезапуска игры. Рефакторинг кода.   Тема 9. Сборка игры   Добавление аудио. Обработка ошибок. Сборка игры. Запуск на устройствах.   Тема 10. Экзамен и практика   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=981670');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (333, 'Этикет на все случаи жизни
', 'online.edu.ru', '   Раздел 1. Почему мы говорим «Здравствуй!» Роль этикета в культуре и повседневном общении   - Что такое этикет?  - Некоторые аспекты этикета  - Почему важно быть вежливым  - Невербальный этикет  - Жесты  - Мимика и зрительный контакт  - Невербальный этикет со студентами   Раздел 2. Этикет в повседневной жизни и в особых ситуациях   - Общие правила этикета  - Знакомство и обращение  - Рукопожатие  - Зрительный контакт и важные слова  - Идем в гости к городу: этикет в общественных местах  - Автомобиль и пешеходный переход  - Интернет-этикет (Netiquette)   Раздел 3. Светский этикет: отдыхаем и развиваемся   - Идем в театр и кино  - Мы в музее  - Отель  - Внешний вид и этикет  - Светская беседа   Раздел 4. Гостевой этикет   - Мы на официальном приеме  - Мы в гостях  - Гости у нас  - Подарки  - Уход из гостей   Раздел 5. Приемы и сервировка стола   - Виды приемов  - Сервировка стола  - Декорируем стол   Раздел 6. Столовый и ресторанный этикет   - Правила поведения за столом  - «Кушать подано!»  - Десерты   Раздел 7. Vivat Academia! Vivant professores!   - Специфика университетской среды и коммуникации студент-преподаватель  - Поведение в аудитории во время лекции   Раздел 8. Деловой этикет. Часть 1   - Особенности делового взаимодействия и знаки уважения в деловом этикете  - Деловой этикет в электронных коммуникациях: деловая переписка  - Деловой этикет в электронных коммуникациях: мобильный телефон   Раздел 9. Деловой этикет. Часть 2   - Внешний вид делового человека  - Визитная карточка  - Деловые подарки   Перед итоговой аттестацией проходит вебинар.    Раздел 10. Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=981671');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (334, 'Протоколы квантовой криптографии: от теории к практике
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=981984');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (335, 'История естествознания
', 'online.edu.ru', '   Модуль 1. Открытия, изменившие мир.   Эпизод 1. Человек, остановивший Солнце.  Эпизод 2. Страсти по Галилео Галилею.  Эпизод 3. Математический анализ.  Эпизод 4. Термодинамика – первое и второе начало природы.  Эпизод 5. Электромагнитное поле Фарадея и Максвелла.  Эпизод 6. Квантовая механика – «милость Божья».   Модуль 2. Изобретения, изменившие мир.   Эпизод 1. Сифон Герона-Грина – трубка, изменившая мир.  Эпизод 2. Измерение времени – «не думай о секундах свысока».  Эпизод 3. Главное достижение физики – очки на службе человечества.  Эпизод 4. Ветряные мельницы и математика.  Эпизод 5. Тепловые двигатели – от лошадей к ракетам.  Эпизод 6. Двигатель внутреннего сгорания – вершина инженерной мысли.  Эпизод 7. Источник жизни (история батарейки).  Эпизод 8. Рождение птицы Феникс (история аккумулятора).  Эпизод 9. Лампочка, но не Ильича.  Эпизод 10. Шарниры – великие и разные.  Эпизод 11. «Все выше, и выше, и выше» - самолеты и космические корабли.  Эпизод 12. Ядерная энергетика – мы из МИФИ.   Модуль 3. Информация, изменившая мир.   Эпизод 1. Книги для всех – Иоганн Гуттенберг.  Эпизод 2. Почта, телеграф, телефон.  Эпизод 3. Многострадальная история радио.  Эпизод 4. Фотография, кино, телевидение – запечатленное изображение.  Эпизод 5. Полупроводники – главные носители и переносители информации.  Эпизод 6. Происхождение жизни глазами физиков.   Модуль 4. Инфраструктура, изменившая мир.   Эпизод 1. Вечная российская беда.  Эпизод 2. «Прямо дороженька: насыпи узкие, столбики, рельсы, мосты…»  Эпизод 3. «Сработанный еще рабами Рима»  Эпизод 4. Канализация – это жизнь.  Эпизод 5. Рожденный четырьмя стихиями: кирпич – основа цивилизации.  Эпизод 6. Электроэнергетика и электрические сети. «Война токов»  Эпизод 7. Оптоволокно – самое прозрачное вещество на свете.   Модуль 5. Измерения, изменившие мир.   Эпизод 1. Системы счисления.  Эпизод 2. Числа и вычисления. Расширяем понятия.  Эпизод 3. Скорость? Скорость… Скорость! (единицы измерений и размерности).  Эпизод 4. У истоков глобализации – система СИ как источник развития.  Эпизод 5. Измерения времени: календарь и небесные циклы.  Эпизод 6. Измеряя мир, в котором мы живем.  Эпизод 7. «Диалог о двух системах мира: Птолемеевой и Коперниковой» (современная версия).   Модуль 6. Инженеры, изменившие мир.   Эпизод 1. Архимед – математик, физик, инженер.  Эпизод 2. Роберт Гук – ученый, инженер, строитель (или «Экспериментальные начала натуральной философии»).  Эпизод 3. Никола Тесла – инженер, изобретатель, авантюрист.  Эпизод 4. В ожидании новых героев – Илон Маск ивсе, все, все…   Завершающий эпизод.  Что еще придумают физики (прогнозы - прошлое, настоящее, будущее).  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=982567');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (336, 'Тяжелые ионы и синтез новых элементов: современные тенденции
', 'online.edu.ru', '  1. Взаимодействие сложных ядер. Особенности реакций с тяжелыми ионами. Классификация реакций с тяжелыми ионами (ТИ). Модели взаимодействия иона с ядром.  2. Экспериментальные методы исследования реакций с тяжелыми ионами. Особенности регистрации ионов ионизационными детекторами. Трековые детекторы в заделах поиска редких событий.  3. Современные ускорители ТИ, ускорение радиоактивных ядер. Многодетекторные спектрометры для исследования ядерных реакций.  4. Кулоновское возбуждение ядерных уровней т.и. Классическое рассмотрение. Каскадное кулоновское возбуждение.  5. Эффект реориентации. Упругое рассеяние ТИ на ядрах. Радужное рассеяние, glori – рассеянье.  6. Спиральное рассеянье. Дифракция Френеля и Фраунгофера.  7. Реакции прямого взаимодействия, передача малого числа нуклонов.  8. Ядерные реакции глубоконеупругих передач.  9. Реакции слияния ядер. Общая характеристика. Методы определения поперечного сечения слияния.  10. Закономерности поперечного сечения слияния ядер.  11. Феноменологическое описание слияния ядер.  12. Расчеты траекторий слияния. Распад составного ядра.  13. Деление ядер ТИ, основные представления.  14. Свойства осколков деления. Особенности деления ядер ТИ. Спонтанное деление трансурановых элементов.  15. Деление высоковозбужденных ядер и ядер с большим угловым моментом.    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=982568');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (337, 'Академическое письмо на русском и английском языках
', 'online.edu.ru', '   Неделя 1. Реферативные средства русского языка как основа создания письменных текстов научного стиля речи.   На первой неделе обучения учащиеся познакомятся с первичными и вторичными научными текстами, сформируют навыки грамотного использования глаголов и некоторых других частей речи в научных текстах, овладеют принципами создания реферативных форм в научных текстах, изучат принципы создания реферативных форм на основе простого и сложного предложений.   Неделя 2. Правила составления аннотации на русском языке.   В этом разделе обучающиеся узнают, что такое аннотация научного текста, какова ее структура, познакомятся со строением предложений аннотации, «словами-помощниками», которые связывают разные структурные части аннотации.   Неделя 3. Методика написания тезисов на русском языке.   На третьей неделе обучения состоится знакомство с жанром тезисов. Учащиеся научатся писать вторичные тезисы, а также узнают лексику, синтаксические конструкции и структуру научных текстов. По завершении изучения раздела учащиеся попробуют создать оригинальные (первичные) тезисы.   Недели 4. Методика написания введения научной статьи на русском языке.   В четвертом разделе курса лектор расскажет о методике написания введения научной статьи на русском языке: о его структуре и обязательных и факультативных компонентах введения. Обучающиеся научатся создавать введение научной статьи с использованием языковых клише.   Недели 5. Методика написания основной части научной статьи на русском языке.   В этом разделе лектор даст общую характеристику структуры основной части научной статьи, рассмотрит ее лексико-грамматические и синтаксические особенности.   Недели 6. Методика написания заключения научной статьи на русском языке.   В процессе освоения шестого раздела обучающиеся изучат методику написания заключения научной статьи, познакомятся с местом заключения в научной статье, а также рассмотрят примеры заключения, узнают, какие языковые и речевые средства используются в заключении, научатся корректно употреблять языковые и речевые клише в заключительной части статьи.   Неделя 7. Правила составления аннотации на английском языке.   В седьмом разделе обучающиеся узнают об особенностях написания текста аннотации на английском языке.   Неделя 8. Методика написания тезисов на английском языке.   Из восьмого раздела обучающиеся узнают об основных особенностях тезисов выступления на конференции, представляемых в редакцию журнала физико-математической направленности, о языковых единицах, необходимых для описания и обсуждения полученных результатов. Также в разделе будут рассмотрены лексико-грамматические средства, характерные для заключительной части тезисов.   Неделя 9. Методика написания введения научной статьи на английском языке.   В этом разделе учащиеся узнают, что такое введение и какова его грамматика. Лектор подробно рассмотрит структуру введения.   Неделя 10. Методика написания основной части научной статьи на английском языке.   В десятом разделе будут изучены грамматические формы страдательного залога в английском языке, особенности его использования при написании научных трудов на английском языке.   Неделя 11. Методика написания заключения научной статьи на английском языке.   В заключительном разделе курса лектор расскажет о понятии «заключение научной статьи», о его функции и структуре в англоязычной научной статье, рассмотрит клише, используемые в заключении научной статьи, и обратит внимание на особенности выражения модальности в нем.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=982569');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (338, 'Русский язык как иностранный (научный стиль речи)
', 'online.edu.ru', '   Неделя 1. Классификация предметов и явлений. Формулирование определения понятия.   В рамках данной темы происходит изучение грамматических конструкций классификации предметов и явлений, вырабатывается навык формулирования определения понятий, приобретается навык создания научных текстов с использованием конструкций классификации предметов и явлений.   Неделя 2. Описание состава и количественной характеристики предмета.   В рамках данной темы изучаются грамматические конструкции состава и количественной характеристики предмета. В конце занятия сначала совместно с преподавателем, а затем самостоятельно учащиеся научатся создавать текст-описание.   Неделя 3. Качественная характеристика предмета.   В этом разделе речь пойдет о грамматических конструкциях качественной характеристики предмета. В процессе освоения темы учащиеся научатся создавать научные тексты-описания с этими конструкциями.   Недели 4-5. Описание связи и взаимосвязи предметов, явлений.   В рамках данной темы учащиеся узнают, какие грамматические конструкции связи предметов, явлений можно использовать при написании научно-технических текстов. По итогам изучения раздела будет сформирован навык составления текста-описания с конструкциями связи и взаимосвязи предметов, явлений.   Недели 6-7. Сравнение и сопоставление предметов или явлений.   В этом разделе учащиеся изучат грамматические конструкции сравнения, сопоставления предметов, явлений, процессов и научатся создавать научные тексты-описания с использованием этих конструкций.   Недели 8-9. Применение предметов и явлений.   Последний класс грамматических конструкций, который учащиеся изучим в рамках курса, – это конструкции применения предметов или явлений. Результатом освоения этой темы будет развитие навыка написания текста о применении предмета.   Неделя 10. Создание научно-технического текста с использованием конструкций научного стиля речи.   В рамках завершающего раздела курса обучающиеся вспомнят все изученные ранее грамматические конструкции и создадут научно-технический текст, используя эти конструкции.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089020');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (359, 'Арабский язык. Часть 2
', 'online.edu.ru', '  МОДУЛЬ 1. «Семья и работа». Удвоенные глаголы. Распространенное глагольное предложение. Описательная превосходная степень прилагательного.  МОДУЛЬ 2. «У врача». Глаголы подобные правильным и их производные. Предложения с модальными глаголами.  МОДУЛЬ 3. «Национальная кухня». Пустые глаголы и их производные. Предложения с фазовыми глаголами.  МОДУЛЬ 4. «Биография». Пустые глаголы и их производные (продолжение). Предложения с глаголами «бытия и становления».  МОДУЛЬ 5. «Путешествие». Недостаточные глаголы и их производные. Условные предложения.  МОДУЛЬ 6. «Спорт». Недостаточные глаголы и их производные (продолжение). Придаточные предложения образа действия.  МОДУЛЬ 7. «Туризм». Особенности написания хамзы. Хамзованые глаголы. Прямая и косвенная речь.  МОДУЛЬ 8. «Театр». Спряжение глагола "ra’ā". Сложноподчиненные предложения с придаточными определительными.  МОДУЛЬ 9. «Музей». Четырехбуквенные глаголы и их производные. Сложносочиненные и сложноподчиненные предложения. Придаточные противительные предложения.  МОДУЛЬ 10. «Санкт-Петербург». Некоторые особенности вдвойне неправильных глаголов. Особенности спряжения глаголов типа “nawā”, “rawā”. Сложноподчиненные предложения с придаточными цели.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132402');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (339, 'Физические основы лазерных технологий
', 'online.edu.ru', '  Курс включает два основных раздела:  1. Физические процессы, происходящие при взаимодействии мощного лазерного излучения с металлами, полупроводниками и диэлектриками;  2. Лазерные технологические установки и лазерные технологические процессы.  Курс состоит из следующих разделов:  1. Введение в лазерные технологии.  2. Процессы передачи энергии лазерного излучения.  3. Механизмы поглощения лазерного излучения.  4. Оптические свойства материалов.  5. Процессы нагрева материалов при воздействии лазерного излучения.  6.Нелинейные случаи нагрева материала лазерным излучением.  7.Физические свойства лазерной плазмы.  8. Методы исследования взаимодействия мощного лазерного излучения с веществом.  9. Лазерные технологические установки.  10. Лазерные технологические установки на основе твердотельных лазеров.  11. Лазерные технологические установки на основе CO2-лазеров.  12. Лазерная технология полупроводников.  13. Лазерная химия.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089021');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (340, 'Управление разработкой корпоративных информационных систем
', 'online.edu.ru', '   Модуль 1. Введение (неделя 1).   Урок 1. Предмет и структура курса.  Урок. 2. Основные понятия и определения. Жизненный цикл.   Модуль 2. Модели жизненного цикла корпоративных систем (неделя 2)   Урок 3. Ограниченныемодели ЖЦ.  Урок 4. Циклические модели ЖЦ.  Урок 5. Специализированные модели ЖЦ.   Модуль 3. Сравнение строгих и гибких методологий (неделя 3)   Урок 6. Обзор строгих методологий  Урок 7. Обзор гибких методологий   Модуль 4. Методология RUP – основы (неделя 4)   Урок 8. Процессы, роли, артефакты.  Урок 9. Итерации, дисциплины.  Урок 10. Принципы, основные этапы.   Модуль 5. Методология MSF – основы (неделя 5).   Урок 11. Вехи, артефакты.  Урок 12. Команда MSF.  Урок 13. Роли и компромиссы.  Урок 14. Принципы, основные этапы.   Модуль 6. Принципы, основные этапы (неделя 6).   Урок 15. MSF: Видение.  Урок 16. MSF: Планирование.  Урок 17. MSF: Разработка.  Урок 18. MSF: Стабилизация и развертывание.   Модуль 7. Классификация "гибких" методологий (неделя 7)   Урок 19. Процессы.  Урок 20. Принципы.  Урок 21. Лучшие практики.   Модуль 8. Методология Scrum (неделя 8)   Урок 22. Scrum: Жизненный цикл.  Урок 23. Scrum: Роли в Scrum.  Урок 24. Scrum: Лучшие практики.  Урок 25. Scrum: Артефакты.   Модуль 9. Методология XP (неделя 9)   Урок 26. XP: Принципы.  Урок 27. XP: Жизненный цикл.  Урок 28. XP: Роли и артефакты.  Урок 29. XP: Практики.   Модуль 10. Методология Agile (неделя 10)   Урок 30. Agile: Основные идеи.  Урок 31. Agile: Принципы.  Урок 32. Agile: Практики.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089022');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (341, 'Физика в опытах. Часть 1. Механика
', 'online.edu.ru', '   Модули    Кинематика.  Динамика:виды сил иинерция.  Динамикаи закон сохранения импульса.  Закон сохраненияэнергии.  Закон сохранения момента импульса.Вращательное движение.  Сложное вращательноедвиение.  Гироскопы.  Неинерциальные системы отсчета.  Гармонические колебания и сложение колебаний.  Затухающие и вынужденные колебания. Резонанс.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089023');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (342, 'Криптографические методы защиты информации
', 'online.edu.ru', '   Тема 1 . Введение   Основные понятия криптографии. Задачи защиты информации, решаемые криптографическими методами. Исторический обзор криптографических методов защиты информации. Простейшие шифры замены и перестановки, частотный криптоанализ. Классификация криптографических систем    Тема 2 . Поточные шифры   Теоретическая и практическая стойкость шифров. Синхронные и самосинхронизирующиеся поточные шифры. Генераторы псевдослучайных последовательностей. Алгоритм А5/1.    Тема 3 . Блочные шифры   Принципы построения итеративных симметричных блочных шифров. Режимы шифрования. Стандарты DES, ГОСТ Р 34.12-2015, ГОСТ Р 34.13-2015.    Тема 4 . Криптосистемы с открытым ключом   Вычислительно сложные математические задачи. Схемы открытого шифрования и электронной подписи. Криптосистемы RSA, Эль-Гамаля. Стандарты DSS, ГОСТ Р 34.10-2012. Примеры криптосистем с дополнительной функциональностью: гомоморфное шифрование, подпись вслепую.    Тема 5 . Методы обеспечения целостности данных   Хеш-функции. Коды аутентификации сообщений CBC-MAC, HMAC.    Тема 6 . Прикладные аспекты криптографии   Технология «цифровой конверт». Протокол Диффи-Хеллмана. Инфраструктура открытых ключей. Защита интернет-соединений с помощью криптографических методов. Протоколы TLS, S/MIME. Применение криптографии в системах мгновенного обмена сообщениями.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089024');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (343, 'Физика в опытах. Часть 2. Молекулярная физика
', 'online.edu.ru', '   Модули    Газовые законы и тепловые машины- 5видео-эпизодов с опытами плюс комментарии преподавателей.  Элементы статистикимолекулярных систем- 7видео-эпизода с опытами плюс комментарии преподавателей  Фазовые превращения - 3 видео-эпизода с опытами плюс комментарии преподавателей.  Явления на границе раздела сред- 18видео-эпизодов с опытами плюс комментарии преподавателей.  Явления переноса и низкие температуры– 11 видео-эпизодов с опытами плюс комментарии преподавателей.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089025');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (360, 'История русской литературы Золотого века
', 'online.edu.ru', '  Модуль 1. Поэзия первой четверти XIX века  Модуль 2. И. А. Крылов, А. С. Грибоедов: комическая линия  Модуль 3. А. С. Пушкин. Творчество 1813-1825 годов  Модуль 4. А.С.Пушкин. Роман в стихах «Евгений Онегин»  Модуль 5. А. С. Пушкин. Творчество первой болдинской осени (1830): болдинские циклы  Модуль 6. А. С. Пушкин. Творчество 1833–1836 годов  Модуль 7. Поэзия М. Ю. Лермонтова  Модуль 8. Роман М.Ю. Лермонтова «Герой нашего времени»  Модуль 9. Н.В.Гоголь Петербургские повести  Модуль 10. Н. В. Гоголь. Комедия «Ревизор». Поэма «Мертвые души»  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132403');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (344, 'Математические и инструментальные методы машинного обучения
', 'online.edu.ru', '   Модуль 1. Задачи и методологии анализа данных (Неделя 1)   Урок 1. Введение в задачи анализа данных. Описание стандартов CRISP-DM, KDD, SEMMA. Основные понятия и методы анализа данных.  Урок 2. Среда интеллектуального анализа данных RapidMiner.   Модуль 2. Подготовка данных (Неделя 2)   Урок 3. Очистка, и обогащение данных.  Урок 4. Метод главных компонент. Матрица нагрузок и матрица счетов. График собственных значений. Критерий Кайзера. Вращение методом Варимакс. Интерпретация результатов факторного анализа.   Модуль 3. Визуализация данных (Неделя 3)   Урок 5. Визуализация данных. Понятие и основные задачи визуализации.  Урок 6. Подходы к визуализации: геометрический, древовидный.   Модуль 4. Понятие описательных статистик (Неделя 4)   Урок 7. Подходы к визуализации: геометрический, древовидный.  Понятие описательных статистик. Вычисление основных показателей положения и вариации. Построение частотных полигонов и гистограмм.   Модуль 5. Анализ связей (Неделя 4)   Урок 8. Корреляционный анализ/Понятие корреляционной связи. Коэффициент корреляции Пирсона. Ранговые коэффициенты. Коэффициенты корреляции для дихотомических и номинальных переменных.  Урок 9. Регрессионный анализ/Простая линейная регрессия. Проверка значимости уравнения линейной регрессии. Оценка качества уравнения линейной регрессии. Коэффициент детерминации. Доверительный интервал линейной регрессии.   Модуль 6. Кластеризация (Неделя 6)   Урок 10. Постановка задачи кластеризации/Понятие кластера. Обзор прикладных задач с использованием методов кластеризации. Обзор основных понятий и методов кластерного анализа.  Урок 11. Иерархические и итеративные методы кластеризации/Иерархическая агломеративная кластеризация. Дендрограммы. Дивизимные методы кластеризации. Метод МакКуина (к-средних).   Модуль 7. Мягкая и жёсткая кластеризация (Неделя 7)   Урок 12. Критерии качества кластеризации.   Модуль 8. Классификация (Неделя 8)   Урок 13. Постановка задачи классификации/Задача классификации с учителем. Понятие и свойства класса. Обзор основных методов классификации. Байесовская наивная классификация/Понятие байесовского классификатора.  Урок 14. Деревья решений в задачах классификации/Понятие деревьев решений. Примеры.   Модуль 9. Методы поиска ассоциативных правил (Неделя 9)   Урок 15. Понятие правил ассоциации. Метод Apriori. Метод FP-Growth. Примеры.  Урок 16. Понятие шаблона последовательных событий. Метод Apriori. Метод GSP.   Модуль 10. Интеллектуальный анализ текста. (Неделя 10)   Урок 17. Токенизация. Векторизация. Регулярные выражения.  Урок 18. Стемминг. Лемматизация. Удаление стоп-слов. Анализ тональности.  Информационные ресурсы – доступ к онлайн-курсам осуществляется с персональных информационных устройств.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089026');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (345, 'Физика в опытах. Часть 3. Электричество и магнетизм
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089027');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (346, 'Оборудование машиностроительных производств
', 'online.edu.ru', '   Модуль 1. Оборудование сварочного производства. Часть 1.   Урок 1. Определение сварки, процесс сварки.  Урок 2. Ручная и автоматическая дуговая сварка.  Урок 3. Сварка на воздухе и в атмосфере защитного газа.   Модуль 2. Оборудование сварочного производства. Часть 2.   Урок 4. Плазменная и газовая сварка, сварка трением.  Урок 5. Оборудование рабочего места сварщика.  Урок 6. Оборудование для подводной сварки и резки.  Урок 7. Оборудование для дуговой сварки крупногабаритных изделий.   Модуль 3. Оборудование для обработки материалов физическими и электрофизическими способами   Урок 8. Основные принципы и общие сведения о физических и электрофизических способах обработки материалов.  Урок 9. Принцип действия лазера.  Урок 10. Твердотельные лазеры: рубиновые лазеры, лазеры на стекле, лазеры на алюмоиттриевом гранате.  Урок 11. Газовые лазеры: аргоновые и криптоновые ионные лазеры.  Урок 12. Основные элементы лазерных установок.  Урок 13. Основные принципы и общие сведения о электронно-лучевой обработке.  Урок 14. Электро-лучевые установки.  Урок 15. Установки вакуумной плавки.  Урок 16. Основные принципы и общие сведения о электроискровой и ультразвуковой обработке.  Урок 17. Установка электроискровой обработки непрофилированным электродом-инструментом.  Урок 18. Ультразвуковая сварка (сварка давлением).   Модуль 4. Оборудование для химической и электрохимической обработки материалов   Урок 19. Оборудование, основные принципы и общие сведения о химической обработке материалов.  Урок 20. Химико-механическое удаление заусенцев.  Урок 21. Установки для обезжиривания деталей с помощью горячего трихлорэтилена.  Урок 22. Оборудование, основные принципы и общие сведения о электрохимической обработке материалов.  Урок 23. Установки для электрохимической полировки деталей.  Урок 24. Промышленные автоматические линии для обезжиривания, промывки и сушки металлических деталей.  Урок 25. Нанесение гальванических покрытий: основные принципы, общие сведения, робототехнологические комплексы и прочее оборудование.   Модуль 5. Металлорежущие станки   Урок 26. Основные понятия и показатели.  Урок 27. Критерии работоспособности.  Урок 28. Методы формообразования поверхностей.  Урок 29. Классификация движений.  Урок 30. Классификация по принципам работы металлорежущих станков.   Модуль 6. Станки токарной и сверлильно-расточной группы, зубо- и резьбообрабатывающие станки   Урок 31. Станки одношпиндельные, многошпиньдельные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 32. Станки токарно-револьверные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 33. Станки токарные специализированные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 34. Станки настольно-вертикально-сверлильные иполуавтоматы: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 35. Станки резьбонарезные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 36. Станки зубодолбёжные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 37. Станки зуборезные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 38. Станки зубофрезерные для цилиндрических колёс, конических колёс: принципы работы, основные особенности, принципиальные и структурные схемы.   Модуль 7. Станки строгальные, долбёжные, протяжные, станки фрезерной группы   Урок 39. Станки поперечно-строгальные одностоечные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 40. Станки поперечно-строгальные двухстоечные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 41. Станки барабанно-фрезерные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 42. Станки вертикально-фрезерные консольные: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 43. Станки фрезерные непрерывного действия: принципы работы, основные особенности, принципиальные и структурные схемы.  Урок 44. Станки продольные одностоечные: принципы работы, основные особенности, принципиальные и структурные схемы.   Модуль 8. Станки разрезные и другие, оборудование для изготовления корпусов   Урок 45. Станки отрезные, оснащенные резцом, абразивным кругом, гладким или насеченным диском.  Урок 46. Станки трубо- и муфтообрабатывающие, пилонасекательные, правильные, бесцентрово-обдирочные.  Урок 47. Многоцелевые металлорежущие станки для обработки корпусных и плоских деталей.  Урок 48. Использование пластмасс.  Урок 49. Вакуумная штамповка пластика.  Урок 50. Формовочные машины.  Урок 51. Термопласт автомат.  Урок 52. Изготовление пресс-форм.   Модуль 9. ЧПУ в металлорежущих станках   Урок 53. Структура аппаратного обеспечения.  Урок 54. Используемое программное обеспечение.  Урок 55. Автоматизация с использованием CAM/CAD/CAE систем.  Урок 56. Промышленная автоматизация.  Урок 57. Автоматизированное рабочее место.  Урок 58. Человеко-машинный интерфейс.   Модуль 10. Роботы и робототехнологические комплексы   Урок 59. Общие сведения о робототехнологических комплексах.  Урок 60. Используемые промышленные роботы, их структурные, принципиальные схемы.  Урок 61. Узлы промышленных роботов: приводы, захватные устройства, системы технического зрения.  Урок 62. Применение промышленных роботов, робототехнологических комлексов и автоматизированных систем в машиностроении.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089028');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (370, 'Литература русского зарубежья
', 'online.edu.ru', '  Модуль 1. Литература первойволны эмиграции и роль в ней писателей разных поколений  Модуль 2. Судьбы русской прозы в эмиграции  Модуль 3. Историософский роман русской эмиграции  Модуль 4. Сатира русского зарубежья первой волны  Модуль 5. Творчество символистов в эмиграции  Модуль 6. Поэзия постсимволистов в эмиграции  Модуль 7. Загадки русского творчества В. Набокова  Модуль 8. Творчество писателей «младшего поколения»  Модуль 9. Журналистика, мемуары и литературная критика русского зарубежья  Модуль 10. Эмигрантская литература третьей волны  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132653');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (347, 'Основы создания инновационного предприятия
', 'online.edu.ru', '   Модуль 1.   Теоретические основы организации инновационной деятельности   Урок 1. Понятие и функции инноваций.  Урок 2. Три основных признака инноваций.   Модуль 2. Инновационный процесс   Урок 3. Жизненный цикл инновации.  Урок 4. Структуризация инновационного процесса по стадиям.  Урок 5. Жизненный цикл нового продукта.   Модуль 3. Показатели инновационной деятельности   Урок 6. Национальная техническая инициатива.  Урок 7. Классификация инноваций.  Урок 8. Функции инноваций.   Модуль 4.   Организационные формы инновационной деятельности   Урок 9. Понятие инновационной организации.  Урок 10. Бизнес-инкубаторы. Понятие технопарка.  Урок 11. Наукоград Российской Федерации.  Урок 12. Особые экономические зоны.  Урок 13. Формы собственности.   Модуль 5. Организация и планирование инноваций   Урок 14. Сущность, принципы и задачи организации инновационной деятельности предприятия.  Урок 15. Типы организационных структур инновационного управления.  Урок 16. Планирование инноваций.   Модуль 6.Инновационные ресурсы   Урок 17.Инновационный климат и инновационная позиция организации.  Урок 18. Инновационная активность.  Урок 19. Затратные показатели. Динамические показатели. Структурные показатели.   Модуль 7. Инновационный потенциал предприятия   Урок 20. Понятие и структура инновационного потенциала.  Урок 21. Подходы к оценке инновационного потенциала.  Урок 22. Цели оценки инновационного потенциала.   Модуль 8. Финансирование инновационной деятельности   Урок 23. Система и классификация источников финансирования инновационной деятельности.  Урок 24. Критерии инвестиционной привлекательности.  Урок 25. Государственное финансирование инноваций.  Урок 26. Специфика венчурного финансирования.  Урок 27.Самофинансирование инновационной деятельности.   Модуль 9.   Государственная поддержка инновационной деятельности   Урок 28. Цели и принципы государственной инновационной политики.  Урок 29. Методы государственного регулирования инновационной деятельности.  Урок 30. Органы государственного регулирования инновационного процесса.   Модуль 10.   Оценка эффективности инновационной деятельности предприятия   Урок 31. Особенности оценки эффективности инноваций.  Урок 32. Показатели бюджетной эффективности инноваций.  Урок 33. Показатели оценки эффективности капитальных вложений в инновации.  Урок 34. Абсолютная экономическая эффективность.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089029');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (348, 'Введение в ядерные физику и технологии
', 'online.edu.ru', '   Модуль 1. Ведение.   1.Структура курса.  2.Знания и навыки, формируемые в курсе.  3.Требования к изучению материалов и получению зачета.   Модуль 2. Химические элементы. Атомы и молекулы. Изотопы.   1.Вещества, атомы и молекулы.  2.Химические элементы и их распространенность в природе.  3.Периодическая система Д.И. Менделеева.  4.Моль и число Авогадро.  5.Строение атома и строение атомного ядра.  6.Изотопы. Карта нуклидов.  7.Решение задач.   Модуль 3. Явление радиоактивности.   1.История открытия явления радиоактивности.  2.Закон радиоактивного распада.  3.Виды распадов.  4.Естественная радиоактивность.  5.Радиоактивные ряды.  6.Активность радиоактивного вещества.  7.Решение задач.   Модуль   4. Ядерные силы. Модели ядра. Энергия связи ядер. Ядерная энергия.   1.История освоения ядерной энергии.  2.Модели атомного ядра. Протон и нейтрон.  3.Изотопы.  4.Взаимосвязь массы и энергии.  5.Энергия связи атомных ядер.  6.Решение задач.   Модуль   5. Ядерные реакции   1.Определение ядерной реакции.  2.Законы сохранения при ядерных реакциях.  3.Классификация ядерных реакций по типу взаимодействующих частиц.  4.Сечение и скорость ядерной реакции.  5.Решение задач.   Модуль   6.Ядерные данные.   1.Система ядерной информации JANIS.  2.Решение задач.   Модуль   7. Природные и техногенные источники радиации. Радиация и экология.   1.Космическое излучение.  2.Радиоактивные изотопы в природе.  3.Использование радиоактивных источников в ядерной медицине.  4.Использование радиоактивных источников в промышленности.  5.Использование радиоактивных источников в сельском хозяйстве.  6.Способы защиты от ионизирующих излучений иправила радиационной безопасности.  7.Решение задач.   Модуль   8. Глобальные источники энергии.   1.Глобальные проблемы человечества.  2.Потребление энергии.  3.Источники энергии.  4.Калорийность топлива.  5.Сравнительный анализ различных способов получения энергии.  6.Решение задач.   Модуль   9. Современная ядерная энергетика.   1.Способы использования ядерной энергии.  2.Типы ядерных реакторов.  3.База данных по атомной энергетике PRIS.  4.Проекты инновационных энергетических систем.  5.Решение задач.   Модуль 10. Перспективы использования ядерных технологий.   1.РИТЭГи.  2.Космические ядерные установки.  3.Термоядерный синтез.  4.Решение задач.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089130');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (383, 'Всеобщая история. Часть 1
', 'online.edu.ru', '  1. Рождение цивилизации. Древнее Двуречье.  2. Древний Египет. Древние цивилизации Индии и Китая во II тыс. до н.э. – сер.I тыс. н.э. Ближний Восток в к. II-I тыс. до н.э.  3. Начало истории Древней Греции. Архаический период. Рождение и становление греческого полиса. Расцвет греческого мира  4. Кризис греческого полиса. Эллинистический мир.  5. Рождение Римской цивилизации. Рим в «царскую» эпоху и в эпоху ранней республики.  6. Римская империя.  7 -10. История средних веков  11-12. История стран Востока в средние века.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132776');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (349, 'Коммерциализация технологий
', 'online.edu.ru', '   Модуль 1. Введение (неделя 1).   Урок 1. Коммерциализация технологий и современные экономические системы. Часть 1.  Урок. 2. Коммерциализация технологий и современные экономические системы. Часть 2.  Урок 3. Клиентооринтированный подход как основа освоения мирового рынка.   Модуль 2. Перспективные рынки высокотехнологичной продукции и услуг (неделя 2)   Урок 4. Рынок как регулятор спроса и предложения  Урок 5. Мировой атомный рынок – пример глобального высокотехнологичного рынка   Модуль 3. Отличия технологического маркетинга от традиционного, теория закупочного центра (неделя 3)   Урок 6. Технологический маркетинг: закупочный центр и продвижение технологий на рынок  Урок 7. Некоторые результаты прогнозирования развития технологий   Модуль 4. «Мезоэкономика» развития: новый взгляд на коммерциализацию технологий (неделя 4)   Урок 8. Экономика крупных корпораций и территориально-производственных комплексов – «мезоэкономика».  Урок 9. Оценка проектов и формирование нематериальных активов в высокотехнологичной сфере.   Модуль 5. Теоретические основы прогнозирования и форсайт-исследований (неделя 5).   Урок 10. Подготовка работы с экспертами: мотивация и организация участия в форсайт-исследованиях. Часть 1  Урок 11. Подготовка работы с экспертами: мотивация и организация участия в форсайт-исследованиях. Часть 2  Урок 12. Работа с экспертами: пассивный и активный сценарии, полевой этап форсайт-исследований.   Модуль 6. «Форсайт-ромб» и практика прогнозирования технологического развития (неделя 6).   Урок 13. Отечественный опыт и методика научно-технологического прогнозирования  Урок 14. Форсайт-флот и применение прогнозирования для формирования Национальной технологической инициативы.   Модуль 7. Федеральный закон «О стратегическом планировании в Российской Федерации» и прогнозирование в энергетической сфере (неделя 7).   Урок 15. Экспертное обеспечение прогнозирования при формировании программ энергетического развития.  Урок 16. Подходы к прогнозированию развития производственных комплексов.   Модуль 8. Методика построения технологических дорожных карт (неделя 8).   Урок 17. Алгоритм разработки технологической дорожной карты.  Урок 18. Методика комбинирования процедур формирования технологических дорожных карт.   Модуль 9. Технологические платформы и территориальные инновационные кластеры (неделя 9).   Урок 19. Технологические платформы: история возникновения и перспективы развития  Урок 20. Технологические платформы в атомной энергетике.  Урок 21. Инновационные российские кластеры – методология и реализация.  Урок 22. Инновационные российские кластеры – методология и реализация: примеры реализованных и формируемых кластеров.   Модуль 10. Сравнение разработки и реализации перспективных технологий с лучшим опытом - бенчмаркинг (неделя 10).   Урок 23. Опыт зарубежного бенчмаркинга: конкурентная гонка в условиях недостатка времени.  Урок 24. Бенчмаркинг и инновационный рейтинг регионов.  Урок 25. Перспективная система управления знаниями в высокотехнологичной промышленной сфере. (Часть 1 – теоретические основы).  Урок 26. Перспективная система управления знаниями в высокотехнологичной промышленной сфере. (Часть 2 – практические результаты).  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1089131');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (350, 'Концепция "петли качества"
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1131342');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (351, 'Школа вожатского мастерства
', 'online.edu.ru', '  Тема 1. Детский озоровительный лагерь;  Тема 2. Работа вожатого в лагере;  Тема 3. Логика развития лагерной смены;  Тема 4. Здоровье;  Тема 5. Временный детский коллектив в лагере;  Тема 6. Психологические особенности личности;  Тема 7. Взаимодействие в конфликтных ситуациях;  Тема 8. Досуговая деятельность  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1131343');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (352, 'Web 2.0 программирование на языке Python
', 'online.edu.ru', '  Тема 1. Основы приложений Web 2.0  Тема 2. Основы HTML и CSS  Тема 3. Практическое введение в язык программирования Python для Django  Тема 4. Разработка современных веб-приложений на языке программирования Python с использованием Django  Тема 5. Веб-формы в Django. Валидация. JavaScript  Тема 6. Административный раздел Django. Аутентификация и авторизация в Django.  Тема 7. Использование баз данных в Django. SQLite. Модели в Django  Тема 8-9. Разработка онлайн-журнала  Итоговая аттестация  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1131346');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (371, 'Правовое регулирование налога на прибыль в Российской Федерации
', 'online.edu.ru', '    1.Общая характеристика налога на прибыль организаций  2.Субъекты налога на прибыль организаций  3.Объект налога на прибыль (доходы)  4.Объект налога на прибыль организаций (расходы)  5.Экономическая обоснованность расходов  6.Необоснованная налоговая выгода  7.Ставки налога на прибыль организаций  8.Налоговый учет, порядок исчисления и уплаты налога на прибыль организаций    ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132654');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (372, 'Расстройства аутистического спектра
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132655');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (353, 'Высшая математика. 2 семестр
', 'online.edu.ru', '  Основные темы:  Раздел 5. дифференциальное исчисление функции одной вещественной переменной: понятия производной и дифференциала, основные правила и теоремы дифференциального исчисления, формулы Тейлора и Маклорена, исследование функций с помощью производных.  Раздел 6. Комплексные числа и многочлены с комплексными переменными: комплексные числа, многочлены и алгебраические уравнения, рациональные дроби.  Раздел 7. Интегральное исчисление функции одной вещественной переменной: неопределенный, определенный и несобственные интегралы, геометрические приложения определенного интеграла.  Раздел 8. Дифференциальное исчисление функции нескольких вещественных переменных: евклидово пространство; предел, непрерывность, частные производные; производные по направлению и градиент; экстремумы функции нескольких переменных.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1131347');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (354, 'Инновационные технологии в социальной работе
', 'online.edu.ru', '  Курс включает в себя 2 модуля и итоговое тестирование. В каждом модуле 4 темы.   Модуль 1. Технологии сопровождения в социальной работе.     Тема 1. Наставничество как технология социально-педагогического сопровождения детей групп риска.  Тема 2. Сопровождаемое проживание и дневная занятость выпускников домов-интернатов для умственно- отсталых детей.  Тема 3. "Самообеспечение" как инновационная технология социальной работы с малоимущими семьями.  Тема 4. Сопровождение принимающих семей как инновационная технология в социальной работе.   Модуль 2 .  Инновационные технологии в сфере социального обслуживания    Тема 5. Социально-бытовая реабилитация детей с ограниченными умственными и физическими возможностями.  Тема 6. Технологии творческой реабилитации людей с ограниченными возможностями.  Тема 7. Участковая социальная служба.  Тема 8. Независимая оценка качества условий оказания услуг организациями социального обслуживания  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1131348');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (355, 'Основы лазерных технологий
', 'online.edu.ru', '   Модуль 1. Введение в дисциплину. Основные понятия и определения    Тема 1. Введение в дисциплину. Основные понятия и определения  Тема 2. Технологические особенности лазерного излучения    Модуль 2 Лазерные технологические комплексы    Тема 3. Классификация лазеров  Тема 4. Структура лазерного технологического комплекса  Тема 5. Основные методы лазерной обработки  Тема 6. Типичные примеры ЛКТ, применяемых в промышленности    Модуль 3 Лазерные технологии    Тема 7. Лазерная сварка  Тема 8. Лазерная резка  Тема 9. Лазерная термообработка  Тема 10. Лазерная наплавка  Тема 11. Лазерная маркировка (гравировка)    Модуль 4. Применение лазеров    Тема 12. Применение лазеров   Тема 13. Заключение. Основы техники безопасности    Модуль 5. Итоговая аттестация   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1131349');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (356, 'Пищевые и биологически активные добавки
', 'online.edu.ru', '   Модуль 1. Пищевые добавки.   Тема 1.1. Введение. Понятия «пищевые добавки», классификация, цели проблемы и перспективы использования.  Тема 1.2. Общие гигиенические требования и нормативы по использованию пищевых добавок.   Модуль 2. Пищевые добавки, изменяющие органолептические свойства продуктов.   Тема 2.1. Понятие «органолептические свойства» продуктов питания. Возможность изменения органолептических свойств продуктов путем введения пищевых добавок.  Тема 2.2. Вещества, изменяющие структурные свойства продуктов.  Тема 2.3. Вкусовые и ароматические вещества.  Тема 2.4. Цветокорректирующие материалы. Вещества, изменяющие или стабилизирующие окраску пищевых продуктов.   Модуль 3. Пищевые добавки, увеличивающие сроки хранения сырья и продуктов питания.   Тема 3.1. Сырье и продукты питания как скоропортящиеся объекты. Причины ухудшения качества или порчи сырья и продуктов питания.  Тема 3.2. Консервирующие вещества (консерванты).  Тема 3.3. Антиокислители и их синергисты.  Тема 3.4. Вещества, уменьшающие влагопотери продуктов.   Модуль 4. Биологически активные добавки.   Тема 4.1. Понятия «Биологически активные добавки» (БАД) и «биологически активные вещества». Классификация БАД.  Тема 4.2. Нутрицевтики.  Тема 4.3. Парафармацевтики.  Тема 4.4. Пробиотики (эубиотики), пребиотики и пробиотические продукты.   Модуль 5. Итоговая аттестация  (итоговое тестирование)  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132040');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (357, 'Теория решения изобретательских задач (ТРИЗ)
', 'online.edu.ru', '  Модуль 1. Введение в ТРИЗ.  Тема 1. Изобретательская деятельность. История возникновения ТРИЗ.  Тема 2. Базовые понятия ТРИЗ. Структура и функции ТРИЗ.  Модуль 2. Методы творческого развития.  Тема 3. Воображение.  Тема 4. Личность.  Тема 5. Коллектив.  Модуль 3. Развитие технических систем.  Тема 6. Понятие технической системы. Вепольный анализ.  Тема 7. Законы развития технических систем.  Тема 8. Типовые приемы устранения противоречий. Диверсионный анализ.  Модуль 4. Повышение эффективности творческого процесса.  Тема 9. Методы системного анализа и синтеза.  Тема 10. Функционально-стоимостной анализ.  Тема 11. Технологии повышения творческой активности.  Модуль 5. Информационный фонд.  Тема 12. Стандарты на решение изобретательских задач.  Тема 13. Технологические эффекты.  Тема 14. Ресурсы.  Тема 15. АРИЗ.  Модуль 6. Итоговая Аттестация.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132041');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (358, 'Ручная и частично механизированная сварка (наплавка)
', 'online.edu.ru', '  Программа курса включает в себя Модули:  - Основы технологии сварки и сварочное оборудование;  - Технология производства сварных конструкций;  - Подготовительные и сборочные операции перед сваркой;  - Контроль качества сварных соединений; - Техника и технология ручной дуговой сварки (наплавки, резки) покрытыми электродами;  - Техника и технология ручной дуговой сварки (наплавки) неплавящимся электродом в защитном газе;  - Техника и технология частично механизированной сварки (наплавки) плавлением в защитном газе;  - Технический английский язык;  - Нормативно-техническая документация и система аттестации в сварочном производстве.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132042');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (361, 'Межкультурная коммуникация и перевод
', 'online.edu.ru', '   Тема 1  Межкультурная коммуникация и перевод – Перевод как средство межкультурной коммуникации. Теория межкультурной коммуникации как наука. Коммуникативный процесс. Коммуникативные неудачи. Типы коммуникации. Невербальная коммуникация.   Тема 2  Язык и культура – Понятие культуры. Усвоение культуры: социализация и инкультурация. Восприятие иных инкультур. Понятие межкультурной толерантности и эмпатии. Культура и коммуникация. Конфликт культур, культурный шок. Усвоение чужой культуры: аккультурация. Формирование бикультурной личности.   Тема 3  Сопоставительная лингвокультурология и проблемы перевода – Картина мира. Концепт как единица МКК. Лингвокультурология как отрасль современного языкознания. Система фоновых знаний. Культурный код. МКК в современную эпоху. Межкультурная коммуникация в цифровом пространстве. Межъязыковая коммуникация в эпоху глобализации.   Тема 4  Лингвокультурный конфликт и лингвокультурная адаптация – Теория лакун. Национально-культурная специфика языка. Проблемы адекватности и эквивалентности в межкультурном переводе. Способы национально-культурной адаптации при переводе.   Тема 5  Лингвострановедческие аспекты МК – МКК и лексическая эквивалентность: интернациональные слова, «псевдо-эквиваленты», «ложные друзья переводчика». Национально-культурное своеобразие неспецифических концептов. Языковая метафора и метонимия. Национально-культурная тематичность. Национально-культурные особенности интертекстуальности/прецедентности. Национально-культурное своеобразие лексической прагматики.   Тема 6  Лингвокультурологическая специфика перевода – Языковой знак и его значение. Переводческие приемы, используемые в процессе национально-культурной адаптации. Элиминация межкультурных лакун: заполнение и компенсация. Предложение и высказывание. Прагматика высказывания. Эквивалентность слов, понятий, реалий. Передача безэквивалентных концептов. Исторические переводческие концепции. Концепция динамической эквивалентности, СКОПОС теория перевода. Терциарный перевод.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132404');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (362, 'Физические основы квантовых вычислений
', 'online.edu.ru', '   Модуль 1.  Основные понятия квантовой механики и теории квантовой информации. Квантово-механическое описание физических систем. Вектор состояния. Линейные операторы. Спектральное уравнение. Динамические переменные и наблюдаемые. Кубит. Физические реализации кубита. Кубит как квантовая единица информации. Сфера Блоха.    Модуль 2.  Статистические аспекты квантовой механики. Чистые и смешанные состояния квантовых систем. Матрица плотности и ее свойства. Системы кубитов. Несепарабельность квантовых систем. Редуцированная матрица плотности.    Модуль 3.  Квантовая запутанность. Разложение Шмидта. Состояния Белла. ЭПР- парадокс. Неравенства Белла.    Модуль 4.  Классические и квантовые логические операции. Общие принципы классических вычислений. Простейшие классические вычисления. Принцип Ландауэра. Обратимые вентили. Матрицы Паули. Однокубитовые логические вентили. Контролируемые квантовые логические вентили.    Модуль 5.  Отличительные особенности квантовых вычислений. Теорема о запрете клонирования. Сверхплотное кодирование. Квантовая телепортация. Эксперимент по квантовой телепортации кубита. Квантовый параллелизм.    Модуль 6.  Квантовые алгоритмы. Алгоритм Дойча. Алгоритм Дойча-Джозы. Квантовое преобразование Фурье. Алгоритм определения собственного числа. Алгоритм факторизации Шора.    Модуль 7.  Основы теории коррекции ошибок. Особенности классической теории коррекции ошибок. Классический трехбитовый код. Особенности квантовой теории коррекции ошибок. Трехкубитовый код.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132405');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (373, 'Русская литература XVIII века: пути развития и культурно-исторический контекст
', 'online.edu.ru', '  Модуль 1. Русская литература XVIII века в контексте истории русской литературы  Модуль 2. Литературные направления в русской литературе XVIII века  Модуль 3. Ода в жанровой системе русской литературы XVIII века  Модуль 4. Эксперимент в русской поэзии XVIII века  Модуль 5. Русская литература XVIII века и риторика  Модуль 6. Церковный контекст русской литературы XVIII в.: ораторская проза  Модуль 7. Государственная политика и развитие русской литературы XVIII в.  Модуль 8. Русская журналистика XVIII века  Модуль 9. Поэзия Г. Р. Державина  Модуль 10. Творчество Н. М. Карамзина  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132656');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (363, 'История английской литературы
', 'online.edu.ru', '  Тема 1.  От эпохи Средневековья к эпохе Просвещения:  Вехи в истории английской литературы. Чосер – «отец английской литературы». Эпоха Возрождения. Шекспир. Эпоха Просвещения. Сатира Свифта. Кельтское возрождение в Англии.  Тема 2.  Романтизм:  Романтизм. Поэты Озерной школы. Джон Китс. Творчество Байрона. Поэзия Шелли. Вальтер Скотт – основоположник исторического романа  Тема 3.  Классический реализм. Литература   2-й половины XIX в.:  Классический реализм. Творчество Чарлза Диккенса. Уильям Теккерей. Реализм 2-й половины XIX в. Неоромантизм. Роберт Луи Стивенсон. Эстетизм. Творчество Оскара Уайльда.  Тема 4.  Английская литература ХХ века : Литература 1-й половины ХХв. Модернизм. Джеймс Джойс. Вирджиния Вулф. Дэвид Герберт Лоуренс. Ричард Олдингтон и его роман «Смерть героя». Антиутопия. Джордж Оруэлл и Олдос Хаксли. Английская литература 2-й половины ХХ в. Постмодернизм. Грэм Грин. Уильям Голдинг. Джон Фаулз.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132406');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (364, 'Турецкий язык. Начальный разговорный курс
', 'online.edu.ru', '   Неделя 1:  Вводная лекция. Общие сведения о турецком языке.  Грамматика: Алфавит. Гармония гласных. Множественность. Указательные местоимения.  Приветствия и прощания  Анимированное знакомство с героями «Знакомство с героями»     Неделя 2:   Грамматика: Простые предложения. Местный падеж. Предикативы. Формула вежливости и обращения  Анимированный диалог «В аэропорту»     Неделя 3:   Грамматика: Принадлежность и притяжательные местоимения. Burası neresi? Послелог için. Повелительное наклонение (2 л. ед. и мн. число). Дательно-направительный падеж. Прилагательные и цвета.  Анимированный диалог «В доме Али»     Неделя 4:   Грамматика: Şimdiki zaman. Исходный падеж. Числительные. Время. Родительный падеж. Парные союзы.  Анимированный диалог «Капалы Чаршы»     Неделя 5:   Грамматика: Порядковые числительные. Конструкция с lâzım. Ne demek? Именная сказуемость. Изафет 2. Порядок аффиксов.  Анимированный диалог «Книжный магазин»     Неделя 6:   Грамматика: Конструкция –mak istemek и Желательное наклонение. Прошедшее время именной сказуемости. Послелог ile и конструкция «У меня есть машина»  Анимированный диалог «Посещение дворца Топкапы»     Неделя 7:   Грамматика: Geniş zaman. Послелог kadar. Повелительное наклонение 3 лица. Словообразовательные аффиксы –lı и –sız  Анимированный диалог «Поездка в Анталью на автобусе»     Неделя 8:   Грамматика: Аффикс -lık. Винительный падеж. Послелоги-имена.  Анимированный диалог «Ресторан»     Неделя 9:   Грамматика: Прошедшее категорическое. Послелог gibi. Поговорки и скороговорки  Анимированный диалог «Тур на корабле»     Неделя 10:   Грамматика: Изафет 1. Kendi. Sebze mebze. Покупки (лексика)  Анимированный диалог «Шоппинг»  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132407');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (365, 'Персидский язык. Начальный разговорный курс
', 'online.edu.ru', '   Неделя 1.  Вводная лекция «Распространение персидского языка и его основные характеристики. История развития персидского языка». Анимационное видео «Представление главных героев курса». Система гласных звуков персидского языка и их отражение в графике. Согласные hā-ye dočešme и wāw.  Персидские местоимения и предлоги. Изафетная конструкция (часть 1).   Неделя 2.  Согласные sin, šin, lām, mim, nun.  Изафетная конструкция (часть 2). Местоименные энклитики. Простое персидское предложение. Вопросительное предложение.  Спряжение глагола-связки. Спряжение глагола budan в прошедшем времени.  Анимационное видео «Встреча друзей».   Неделя 3.  Согласные be, pe, te, se.  Изафетная конструкция (часть 3). Спряжение глагола dāštan в настоящем времени. Анимационное видео «В доме Нима».   Неделя 4.  Согласные jim, хе, čе, hā-ye hotti.  Множественное число в персидском языке. Вопросительные слова či, če, čandom. Изафетная цепь. Числительные 1-20 и порядковые числительные. Персидский глагол и его спряжение в прошедшем времени. Выделительная конструкция.  Анимационное видео. «В университете».   Неделя 5.  Согласные dāl, zāl, re, ze, že.  Спряжение глаголов xāndan и gereftan в простом прошедшем времени. Послелог -rā. Составные глаголы. Составной глагол dust dāštan «любить». Образование настояще-будущего времени у правильных и неправильных персидских глаголов.  Анимационное видео 1. «Интервью Амина» 2. «В книжном магазине».   Неделя 6.  Согласные kāf и gāf.   Йа-йе несбат и йа-йе масдари. Отрицательная форма глагола-связки. Составные глаголы в простом прошедшем времени (peydā kardan, tamām šodan). Аорист (часть 1). Дни недели. Порядковые числительные (часть 2). Множественное число с суффиксом -āt.  Анимационное видео «В парке».   Неделя 7.  Согласные eyn, ġeyn, fe, ġāf.  Цвета. Аорист (часть 2). Образование формы аориста от глаголов budan и dāštan.  Анимационное видео 1. «Адрес ресторана». 2. «Внешность господина Амири».   Неделя 8.  Согласные sād, zād, tā, zā. Глаголы движения āmadan и raftan. Вопросительные предложения с вопросительным словом čerā. Повелительное наклонение (часть 1). Сочетание местоимения xod с энклитиками.  Анимационное видео 1. «Поиск ресторана». 2. «Встреча с господином Амири».   Неделя 9.  Хамзе, танвин и ташдид.  Аорист (часть 3). Ориентация во времени.  Анимационное видео «Ужин в ресторане».   Неделя 10.  Повелительное наклонение (часть 2). Аорист (часть 4). Конструкция az čizi xošam miāyad «мне нравится...». Иранские деньги.  Анимационное видео «В ресторане. Часть 2. Оплата счета».   Неделя 11.  Глагол gozaštan и конструкция qarār ast ke... Стороны света. Сравнительная и превосходная степень прилагательных. Анимационное видео 1. «Приглашение в гости». 2. «Знакомство с господином Лавасани».  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132408');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (366, 'Персидский язык. Разговорный курс. Часть 2.
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132409');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (367, 'Введение в гендерную социологию
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132650');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (368, 'Введение в теорию перевода
', 'online.edu.ru', '   Модуль 1. Краткая история перевода.  История перевода в разных странах мира в разные эпохи. Конвенциональные концепции перевода в разные эпохи. Выдающиеся переводчики и их взгляды на перевод.   Модуль 2. Краткая история перевода в России.  История перевода в России с древнейших времен до начала XXI в.   Модуль 3. Развитие переводоведения в разных странах мира . Развитие переводоведения в разных странах мира. Изобретение синхронного перевода. Наиболее значимые труды переводчиков и переводоведов разных стран. Становление теории перевода в России. Вклад в науку о переводе А. В. Федорова, В. Н. Комиссарова, Я. И. Рецкера, Л. С. Бархударова и других ученых.   Модуль 4. Перевод и теория перевода.  Предмет, объект и задачи теории перевода. Проблема определения перевода. Виды перевода. Проблема описания процесса перевода.   Модуль 5. Основные теоретические вопросы перевода.  Понятие «единица перевода» и способы ее выделения. Проблема переводимости/непереводимости. Эквивалентность и адекватность перевода. Прагматические аспекты перевода. Интерференция в переводе. Переводческие трансформации.   Модуль 6. Некоторые лексико-семантические, фонетические и стилистические проблемы перевода.  «Ложные друзья переводчика». Перевод реалий. Перевод фразеологизмов. Перевод имен собственных.   Модуль 7. Особенности перевода некоторых типов (жанров) текста.  Транслатологические классификации текстов А. В. Федеорова, К. Райс, А. Нойберта, И. С. Алексеевой. Особенности устного и письменного перевода некоторых типов (жанров) текста. Проблема оценки качества перевода. Классификация переводческих ошибок.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132651');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (369, 'Квантовые вычисления
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132652');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (374, 'Современная педагогика. Как это работает
', 'online.edu.ru', '  Модуль 1.Современная педагогика.  Модуль 2. Кейс-технология как методобразования.  Модуль 3. Исследование.  Модуль 4. Проектирование.  Модуль 5. Общение.  Модуль 6. «Новая грамотность» в цифровую эпоху.  Модуль 7. Навыки сотрудничества и работы в команде  Модуль 8. Самоорганизация.  Модуль 9. Самообразование: учись учиться.  Модуль 10. Защита проектов и исследовательских заданий.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132657');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (375, 'Современная русская литература
', 'online.edu.ru', '  Модуль 1. Предыстория современной литературы  Модуль 2. Писатели, опередившие свое время  Модуль 3. Рождение русского постмодернизма. Московский концептуализм. Творчество Владимира Сорокина  Модуль 4. Развитие постмодернистской литературы. Творчество Виктора Пелевина  Модуль 5. Между постмодернизмом, «либеральной» и массовой литературой. Творчество Бориса Акунина  Модуль 6. Между постмодернизмом и «гуманной» литературой. Творчество Татьяны Толстой и Михаила Шишкина  Модуль 7. Литературная ситуация 2000-х годов. Творчество Алексея Иванова  Модуль 8. Постмодернистские имперские (анти) утопии и возвращение соцарта  Модуль 9. «Новый реализм» 2000-х годов. Радикальный реализм: творчество Захара Прилепина  Модуль 10. Литература последнего десятилетия. Новые имена и тренды  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132658');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (376, 'Страноведение Великобритании и США
', 'online.edu.ru', '  Модуль 1 – Стереотипы и представления о Великобритании. Общие сведения о Великобритании (название страны, герб, флаг, география, экономика)  Модуль 2 - Общие сведения об административном, политическом устройстве ВБ, образовании и этническом и религиозном составе  Модуль 3 - История Англии с древнейших времен до 17 века  Модуль 4 – История Великобритании с войны Роз до конца 17 века  Модуль 5 – Великобритания с начала 18 до начала 21 веков.  Модуль 6 – Общие сведения о физической и экономической географии США, политическом, административном устройстве, системе образования и праздниках США  Модуль 7 – История США до начала 20века. - Открытие и колонизация Америки. Возникновение США. Основные события в истории США 18 века.  Модуль 8 –США. Основные события 20 – начала 21века.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132659');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (377, 'Строение вещества: от атомов и молекул до материалов и наночастиц
', 'online.edu.ru', '  Модуль 1. Модели и модельные представления в химии. Развитие представлений о строении вещества от античности до начала 20 века. Химический элемент. Атомно-молекулярная теория. Эквивалент. Основные законы АМТ.  Модуль 2. Строение атома. Опыты Крукса. Открытие электрона. Фотоэффект. Рентгеновское излучение. Радиоактивность. Изотопы. Закон Мозли. Опыты Резерфорда. Теория Бора. Квантовые числа.  Модуль 3. Корпускулярно-волновой дуализм. Гипотеза Де-Бройля. Квантово-механическое описание атома. Радиальная и угловая часть волновой функции. Атомные орбитали. Основные характеристики атома.  Модуль 4. Типы химической связи. Ионная связь. Энергия кристаллической решетки. Ковалентная связь. Метод молекулярных орбиталей для частицы H2+.  Модуль 5. Метод валентных связей для молекулы водорода. Двухатомные гомо- и гетероядерные молекулы элементов второго периода (методы МО и ВС). Геометрия молекул. Теория ОЭПВО.  Модуль 6. Гибридизация АО. Многоатомные молекулы в методе МО и ВС. Донорно-акцепторная связь. Электрондефицитные и электронизбыточные молекулы. Теория гипервалентных связей.  Модуль 7. Комплексные соединения. Соединения со связью металл-металл. Кластеры. Металлическая связь. Зонная теория. Металлы, металлоиды, полупроводники, диэлектрики. Интерметаллиды. Свойства и применение металлов и сплавов.  Модуль 8. Межмолекулярное взаимодействие. Ориентационное, индукционное, дисперсионное взаимодействие. Водородная связь. Диводородная связь. Структура жидкостей. Особые свойства воды. Металлофильные взаимодействия. Галогенная и пниктогенная связь. Агрегатные состояния вещества. Твердое тело, жидкость, газ, плазма. Плазмотрон.  Модуль 9. Типы кристаллических решеток. Инженерия кристаллов. Стекла и ситаллы. Ионные жидкости и их применение.  Модуль 10. Нестехиометрические соединения. Магнитные свойства твердых тел.  Модуль 11. Инженерия материалов. Композитные материалы. Металл-органические каркасные соединения. Подходы цифровой экономики в области химических наук.  Модуль 12. Наноструктуры и наноматериалы. Подготовка к финальному тестированию.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132770');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (378, 'Телекоммуникационные и компьютерные технологии в рекламе и связях с общественностью
', 'online.edu.ru', '  Модуль 1. Введение. Основные тенденции развития цифровых коммуникаций  Модуль 2. Методы поиска информации, ее верификации и автоматизации мониторинга медиапространства  Модуль 3. разработка и создание контента для корпоративных и промо-сайтов  Модуль 4. Виды интернет-рекламы. Технология размещения контекстной рекламы  Модуль 5. Цифровой краудсорсинг  Модуль 6. SMM, реклама и прикладные механики продвижения в социальных сетях  Модуль 7. Вирусные технологии в рекламе и связях с общественностью  Модуль 8. Мобильный Интернет, гаджеты и искусственный интеллект в системе современных рекламных и PR-коммуникаций  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132771');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (379, 'Теоретическая грамматика английского языка
', 'online.edu.ru', '  МОДУЛЬ 1. Языковой знак. Обязательные свойства знака. Уровни языковой системы. Единицы уровней. Дистрибуция. Предмет грамматики. Цели и задачи. Связь грамматики с другими отраслями лингвистики. Типы грамматических описаний. Лингвистическая типология. Аналитизм. Синтетизм. Общая характеристика строя английского языка.  МОДУЛЬ 2. Основные понятия грамматической системы языка. Сочетаемость – фундаментальное свойство единиц языка. Морфология как раздел грамматики. Грамматические классы. Критерии классификации языковых единиц. Проблемы классификации частей речи в отечественной и зарубежной лингвистике. Части речи современного английского языка.  МОДУЛЬ 3. Имя существительное. Категории числа, рода. Синтаксические функции. Имя прилагательное. Степени сравнения. Синтаксические функции. Числительное. Местоимение.  МОДУЛЬ 4. Глагол. Грамматические категории. Неличные формы глагола. Инфинитив. Герундий. Причастие. Наречие. Модальные слова. Междометия. Служебные части речи. Частицы. Артикль  МОДУЛЬ 5. Синтаксис. Синтаксические отношения. Характеристика основных грамматических теорий. Словосочетание. Предложение. Главные члены предложения. Второстепенные члены предложения. Сложное предложение. Грамматика текста.  МОДУЛЬ 6. Семантическая теория. Направления и школы. Прагматика как часть семантики. Языковой знак и его значение. Типы значений. Значение предложения. Пропозиция. Модус. Предикат. Семантические роли. Контекст, его типы. Пресуппозиция. Теория речевых актов. Постулаты речевого общения. Тема-рематическая организация высказывания и текста. Текст и дискурс  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132772');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (380, 'Финансовая грамотность
', 'online.edu.ru', '  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132773');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (381, 'Цифровизация в управлении человеческими ресурсами
', 'online.edu.ru', '  Модуль 1. Введение в курс. Обоснование актуальности темы цифровизации в управлении человеческими ресурсами. Структура курса. Модуль 2. Понятие цифровизации в управлении. Перспективы развития цифровизации в современных экономических и социальных условиях. Модуль 3. Возможности и основные направления применения цифровых технологий в управлении человеческими ресурсами Модуль 4. Организация управления человеческими ресурсами на основе специализированных ERP-систем Модуль 5. Agile в управлении человеческими ресурсами. Возможности HR-аналитики в эпоху автоматизации Модуль 6. Использование роботов и чат-ботов в процедурах найма персонала. Модуль 7. Применение цифровизации и автоматизации в деловой оценке персонала Модуль 8. Реализация электронного обучения персонала Модуль 9. Возможности применения нейро-инструментов в управлении человеческими ресурсами Модуль 10. Систематизация материала по цифровизации в HR. Заключение  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132774');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (382, 'Стилистика русского языка
', 'online.edu.ru', '  Курс состоит из 6 тем.  Первая тема посвящена вопросам терминологии и базовым лингвистическим теориям, на основе которых строится дальнейшее описание образных средств языка.  Во второй теме даются сведения об основном законе создания образа, о связи языка и мышления, а также о стилистических фигурах, образованных на основе подобия знаков (сравнение, метафора, олицетворение, прономинация, антономазия и т.д.)  В третьей теме обучающийся продолжит изучение фигур подобия, получит представление о фигурах, образованных на основе контраста (антитеза, амфитеза, оксюморон, ирония, сарказм, астеизм и т. д.), изучит фигуры смежности (метонимия, синекдоха, металепсис и др.)  В четвертой теме описаны особенности различных стилей общенародного языка (научного, официально-делового, газетно-публицистического, сленга, арго, жаргона и т.д.) Слушатели изучат основные фигуры фонологического уровня языковой структуры (аллитерация, ассонанс, палиндром и т.д.)  В пятой теме представлены фигуры морфологического уровня (различные виды повтора морфем, преобразование грамматических категорий, образование неологизмов особого типа и др.) и лексического уровня (анафора, эпифора, симплока, рефрен и т. д.)  В шестой теме продолжается изучение фигур лексического уровня (заимствования, синонимия, жаргонизмы, диалектизмы и др.) и дается описание фигур синтаксического уровня (градация, парцелляция, зевгма, фразы-перевертыши и т.д.)  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=1132775');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (384, 'Эксплуатация аэропортов
', 'online.edu.ru', '   Модуль 1. Аэропорты и аэродромы гражданской авиации. Основные понятия и определения используемые в курсе. Классификация аэропортов и аэродромов гражданской авиации. Аэропорт как функциональная система. Анализ уровняразвития мировых и отечественных аэропортов. Структура служб аэропорта.   Модуль 2. Безопасность полетов. Система управления безопасностью полетов. Авиационные события.Расследование авиационных событий.Влияние человека на функционирование авиатранспортной системы.   Модуль 3. Годность аэропорта к эксплуатации. Факторы, ограничивающие эксплуатацию аэропорта.Проблема шума в аэропортах. Борьба с птицами: орнитологическое обеспечение полетов. Сертификация аэропортов и аэродромов гражданской авиации: цели и задачи. Процедура сертификации аэропортов и аэродромов гражданской авиации.   Модуль 4. Комплекс обслуживания полезной нагрузки аэропорта. Аэровокзальный комплекс аэропорта.Организация пассажирских перевозок в аэропорту.Обработка и сортировка багажа пассажиров.Дополнительные сервисы: обеспечение пассажиров бортпитанием.Организация почтовых и грузовых перевозок в аэропорту.   Модуль 5. Радиотехническое обеспечение полетов. Взлет и посадка.Основы радиолокации и радионавигации. Курсо-глиссадная система. Азимутально-дальномерная система ближней навигации VOR/DME. Дополнительное аэродромное радиотехническое оборудование.   Модуль 6. Светосигнальное обеспечение полетов. Системы светосигнального оборудования.Средства посадки и взлёта.Средства руления.Категорирование аэродромов гражданской авиации в зависимости от характеристик технических средств обеспечения взлёта и посадки.   Модуль 7. Содержание аэродромов гражданской авиации. Работы по содержанию и ремонту аэродромов. Содержание аэродрома в осенне-зимний период. Содержание аэродромов в весенне-летний период.Машины и механизмы, необходимые для содержания аэродромов. Определение потребного количества машин и механизмов, необходимых для содержания аэродрома.   Модуль 8. Поисковое и аварийно-спасательное обеспечение полетов. Единая система авиационно-космического поиска и спасания. Дежурные силы и средства авиационно-космического поиска и спасания. Поисковое и аварийно-спасательное обеспечение полетов. Аварийно-спасательные средства СПАСОП АП. РаботаСПАСОП аэропорта.   Модуль 9. Авиационная безопасность и транспортная безопасность. Акты незаконного вмешательства в деятельность гражданской авиации. Категорирование объектов транспортной инфраструктуры, транспортных средств. Оценка уязвимости объектов транспортной инфраструктуры, транспортных средств. Предполетный досмотр пассажиров и их багажа. Досмотр воздушных судов и контроль периметра аэропорта. Профайлинг как способ предотвращения противоправных действий.   Модуль 10. Коммерческая эксплуатация аэропортов. Формирование доходов аэропорта. Доходы аэропорта от авиационной деятельности. Государственное регулирование доходов аэропорта от авиационной деятельности. Доходы аэропорта от неавиационной деятельности. Финансирование аэропортов. Современные тенденции развития аэропортового бизнеса.  ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=11041668');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (385, 'Расчёт лётных характеристик ракеты-носителя
', 'online.edu.ru', '   Модуль 1. Что такое ракета? Принцип реактивного движения. Этапы развития ракет и ракетной техники. Характеристики ракет. Структура ракеты.   Модуль 2. Основы теории реактивного движения. Уравнение Мещерского. Сила тяги. Реактивное ускорение. Формула Циолковского. Оценка энергетических возможностей. Понятие характеристической скорости.   Модуль 3. Модели атмосферы и поля тяготения Земли. Математическая модель атмосферы Земли.Модель поля тяготения Земли.   Модуль 4. Силы, действующие на ракету. Основные участки траектории полёта. Силы, действующие на ракету в полёте.   Модуль 5. Векторные уравнения движения ракеты-носителя. Системы координат. Векторные уравнения движения центра масс и относительно центра масс. Системы координат. Взаимная ориентация систем координат.   Модуль 6. Уравнения движения ракеты-носителя на оси траекторной системы координат. Пересчет общих уравнений движения на оси траекторной системы координат. Уравнения движения ракеты-носителя на оси траекторной системы координат для частного случая.   Модуль 7. Траектории выведения ступеней ракеты-носителя. Движение первой ступени ракеты-носителя. Программа управления при движении первой ступени ракеты-носителя. Движение второй ступени ракеты-носителя. Выбор программы управления углом тангажа.   Модуль 8. Подготовка исходных данных для расчёта лётных характеристик. Двухступенчатые ракеты-носители и космодромы. Выбор ракеты-носителя. Расчёт потребной скорости выведения летательного аппарата.   Модуль 9. Расчёт лётных характеристик. Расчёт траектории движения ракеты-носителя. Выбор номинальных законов управления. Определение избытка/недостатка топлива второй ступени.   Модуль 10. Итоговоетестирование.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=11042082');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (387, 'Самолёт: от пассажира к инженеру
', 'online.edu.ru', '   Модуль 1. Что такое качество и как им управлять? Введение в курс. Всеобщее управление качеством (TQM). Система стандартов управления качеством.   Модуль 2. Как планер самолёта обеспечивает комфорт и безопасность пассажира. Самолёты, салоны и кресла. Аэропорт. Техническое обслуживание и ремонт. Управление воздушным движением. Окружающая среда. Этапы жизненного цикла самолёта.   Модуль 3. Как двигатель самолёта влияет на безопасность и комфорт пассажира? Как работает воздушно-реактивный двигатель? Какие бывают воздушно-реактивные двигатели? Жизнь двигателя: от инженера до пассажираи немного шире. Как выбираются параметры двигателя? Как инженеры-двигателисты делают ваш полёт комфортным и безопасным?   Модуль 4. Ситуационное задание на построение элементов «Дома Качества» самолёта. Постановка задачи слушателям – ознакомление их с агрегированными группами показателей качества воздушной перевозки.   Модуль 5. Методы управления качеством. Классификация методов управления качеством. Оценка качества транспортного обслуживания. Структурирование функции качества (QFD). Продуктовое задание по формированию перечня показателей качества: «Голос пассажира» - определение локальных показателей качества воздушной перевозки.   Модуль 6. Внешний облик самолёта. Удельная нагрузка на крыло. Тяговооружённость. Масса самолёта. Размеры планера. Центровка. Аэродинамика.   Модуль 7. Жизненный цикл двигателя. Выбор параметров двигателя. Проектирование узлов: от газовой динамики до прочности. Изготовление двигателей: современные технологии. Испытания.   Модуль 8. Качество услуги воздушной перевозки. Системный подход к обеспечению качества воздушной перевозки. Критерии качества обслуживания воздушных перевозок. Стандарты качества перевозок и обслуживания пассажиров воздушным транспортом.   Модуль 9. Конструкция планера. Требования. Материалы. Конструктивно-силовая схема. Узлы. Детали. Документация.   Модуль 10. Конструкция авиационных двигателей. Принципиальные схемы авиационных двигателей. Входные устройства: классификация, конструкция и принцип работы. Компрессоры: классификация, конструкция и принцип работы. Камеры сгорания: классификация, конструкция и принцип работы. Турбины: классификация, конструкция и принцип работы. Выходные устройства: классификация, конструкция и принцип работы.   Модуль 11. Итоговое тестирование.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=11042095');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (388, 'Потенциальные течения жидкости
', 'online.edu.ru', '   Модуль1. Введение. Модель потенциальных течений. Вращательное движение жидкой частицы. Угловая скорость и ротор. Деформационное движение жидкости. Дивергенция вектора скорости. Безвихревое движение жидкости. Потенциал скорости. Уравнение неразрывности. Частные случаи уравнения неразрывности. Дифференциальное уравнение линии тока. Функция тока. Гидродинамический смысл функции тока. Уравнение Лапласа и граничные условия. Формулировка краевой задачи Дирихле и Неймана.   Модуль 2. Применение теории функций комплексного переменного для решения задач потенциального течения. Условия Коши-Римана. Комплексный потенциал течения. Сопряжённая скорость. Годограф скорости. Циркуляция и расход. Простейшие потенциальные течения: однородный поток, источник-сток, вихрь. Принцип суперпозиции потенциальных течений. Диполь. Вихреисточник. Бесциркуляционное обтекание цилиндра. Парадокс Даламбера. Циркуляционное обтекание цилиндра. Формула Жуковского о подъёмной силе.   Модуль 3. Применения конформных преобразований для решения задач потенциальных течений. Основные идеи конформных преобразований применительно к решению задач. Постулат Жуковского-Чаплыгина-Кутта. Теорема Томсона и разгонный вихрь. Теоретические профили НЕЖ и САЧ. Обтекание теоретических профилей.   Модуль 4. Численные методы дискретных особенностей (сингулярностей) для двумерных задач. Метод дискретных вихрей (МДВ). Метод отражений. Отражение от плоскости. Отражение относительно окружности. Численно-аналитический метод.   Модуль 5. Комплексный метод граничных элементов (КМГЭ). Постановка задачи. Интегральная формула Коши. Формулировка граничных условий в виде задания значений для потенциала скоростей и функции тока. Примеры решения задач по КМГЭ.   Модуль 6. Панельные методы для двумерных задач. Формула Грина как теоретическая основа панельных методов. Пример решения задачи по панельному методу. Пример решения задачи по панельному методу для случая вдува жидкости с поверхности тела.   Модуль 7. Потенциальные обтекания 2D-тел вблизи экрана. Физические аспекты течения вблизи экранирующей поверхности. Способы постановки задачи для рассмотрения экранного эффекта. Выполнение гипотезы Жуковского-Чаплыгина-Кутта на задней кромке профиля при обтекании вблизи экрана. Примеры решения задач потенциального обтекания 2D-тел вблизи экрана.   Модуль 8. Простейшие потенциальные течения в трёхмерном случае. Трёхмерный источник-сток. Отражение источника-стока от плоскости. Трёхмерный диполь. Отражение источника-стока от сферы.   Модуль 9. Аналитические методы для трёхмерных задач потенциальных течений. Потенциальное течение около сферы. Потенциальное течение около эллипсоидов вращения. Расчёт критического числа Маха для осесимметричных тел.   Модуль 10. Панельные методы для трёхмерных задач. 3D панельный источник-сток. Численный панельный метод для трёхмерных тел. Примеры решения задач потенциальных течений около 3D тел.   Модуль 11. Численные методы дискретных вихрей для нестационарных задач. Теоремы Стокса, Гельмгольца и Томсона о вихрях. Постановка задачи о нестационарном обтекании плоской пластины. Постановка задачи о нестационарном обтекании профиля. Примеры решения задач о нестационарном обтекании 2D тел.   Модуль 12. Итоговое тестирование.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=11042101');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (389, 'Основы кристаллохимии
', 'online.edu.ru', '   Модуль 1. Операции и элементы симметрии. Основные понятия симметрии. Элементы симметрии кристаллов. Теоремы о взаимодействии элементов симметрии.   Модуль 2. Точечные группы симметрии. Обозначение точечных групп симметрии кристаллов. Правила нахождения элементов симметрии кристаллов и определения точечной группы. Предельные точечные группы.   Модуль 3. Пространственные группы симметрии. Трансляции и кристаллическая решетка. Сингонии. Решетки Браве. Открытые элементы симметрии. Пространственные группы симметрии. Правильные системы точек.   Модуль 4. Примеры анализа структуры кристаллов. Анализ структуры молекулярного кристалла. Анализ структуры цепочечного кристалла. Анализ структуры слоистого кристалла.   Модуль 5. Важнейшие понятия кристаллохимии. Изоморфизм, изоструктурность, изоточечность. Принцип максимального заполнения пространства. Плотнейшие шаровые упаковки.   Модуль 6. Строение простых веществ и сплавов. Неметаллы. Правило Юм-Розери. Металлы. Сплавы. Интерметаллиды. Фазы Юм-Розери. Фазы Лавеса.   Модуль 7. Строение химических соединений. Структуры с заполнением октаэдрических пустот. Структуры с заполнением тетраэдрических пустот. Структуры с одновременным заполнением октаэдрических и тетраэдрических пустот. Структуры соединений, не описываемые в терминах шаровых упаковок.   Модуль 8. Валентные усилия и кристаллохимические формулы. Валентные усилия связей. Правило Полинга. Координационные соединения и кристаллохимические формулы. Кристаллохимическая систематика по В.Н. Сережкину.   Модуль 9. Дополнительная информация о кристаллах. Рентгеновская плотность вещества. Квазикристаллы и модулированные кристаллы. Алгоритм для определения точечных групп симметрии кристаллов. Методы выращивания кристаллов.   Модуль 10. Итоговое тестирование.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=11042108');
INSERT INTO public.workprogramsapp_onlinecourse VALUES (390, 'Как читать фотографию
', 'online.edu.ru', '   Модуль 1. Фотография и язык. Фотография как текст, или Зачем нужна «визуальная грамотность». Как «говорит» фотография, или Истории в картинках. Четыре агента фотописьма и фотографическое приключение. Где рождается смысл: текст и контекст. «Чтение» фотографии: от узнавания до понимания.   Модуль 2. Восприятие фотографии: время и пространство, статика и динамика. Фотография как образ прошлого, или Что значит «помнить фотографией». Время и пространство фотографии. Геометрия фотографии, или Куда приводят углы. Движение в статике фотографии.   Модуль 3. Фотография и общество. История человека в фотографии. Фотография: реальность или вымысел. Фотография как «зеркало» и «идеализатор поведения». Фотоконструкция образа «Я». Жажда жанра.   Модуль 4. Прикладные возможности фотографии в науке. Интеграция фотографии и науки. Назначение фотографии в науке. Партнёрская работа с фотографией. Визуальные методы обратной связи: фотовыявление. Визуальные методы обратной связи: фотоотклик. Фотография и маркетинг: как картинки заставляют нас покупать.   Модуль 5. Практика создания фотографии в целях исследования. Как и зачем фотографировать, если ты не фотограф, а исследователь. Как развить визуальное воображение. Этика работы с фотографией: «вхождение» VS «вторжение». Что такое «портрет с окружением». Три ошибки фотографирующего исследователя.   Модуль 6. Практика анализа фотографии. Секвенционная интерпретация Р. Брекнер. Семиотическая и структурная интерпретация. Герменевтическая и дискурсивная интерпретация. Иконография и иконология Э.Панофского. Контент-анализ фотографии: за и против. Комплексный подход к анализу фотографии.   Модуль 7. Предметное поле фотографических исследований. (Авто)биография и фотография в семейном альбоме. Фотография в исследованиях городского пространства. Идеологичность видения в фокусе фотокамеры. Мода, красота и телесность в зеркале фотографии. Фотография в СМИ: функции и возможности.   Модуль 8. От фотографии к киноплёнке. Кино аттракционов и первые оптические приборы. Фотография как застывший кадр. Фотография как основание природы фильма З.Кракауэра.   Модуль 9. Фотографирование само по себе. К вопросу о мотивах фотосъёмки. Туристическая фотография. Фотография в обрядах перехода. Мобилография, вернакулярная фотография и социальные сети. Фотография как повседневное искусство.   Модуль 10. Итоговое тестирование.   ', 'https://online.edu.ru/public/course.xhtml?faces-redirect=true&cid=11042120');


--
-- Data for Name: workprogramsapp_outcomesofworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_outcomesofworkprogram VALUES (5, '1', 4, 2);


--
-- Data for Name: workprogramsapp_outcomesofworkprogram_evaluation_tool; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_outcomesofworkprogram_evaluation_tool VALUES (1, 5, 3);
INSERT INTO public.workprogramsapp_outcomesofworkprogram_evaluation_tool VALUES (2, 5, 4);


--
-- Data for Name: workprogramsapp_prerequisitesofworkprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_prerequisitesofworkprogram VALUES (13, '1', 20, 5);
INSERT INTO public.workprogramsapp_prerequisitesofworkprogram VALUES (14, '2', 79, 5);
INSERT INTO public.workprogramsapp_prerequisitesofworkprogram VALUES (16, '1', 83, 5);
INSERT INTO public.workprogramsapp_prerequisitesofworkprogram VALUES (17, '1', 82, 5);
INSERT INTO public.workprogramsapp_prerequisitesofworkprogram VALUES (18, '2', 36, 5);


--
-- Data for Name: workprogramsapp_route; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_routecomposition; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: workprogramsapp_topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_topic VALUES (4, 3, 'Так себе тема', 11, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (6, 1, 'Крутой топик проверка 2 Крутой топик проверка 2 Крутой топик проверка 2 Крутой топик проверка 2', 2, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (1, 4, 'А тут добавим курс', 2, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (14, 3, 'Прямые алгоритмы аналитического решения некоторых типов систем нелинейных алгебраических уравнений', 5, 1);
INSERT INTO public.workprogramsapp_topic VALUES (15, 4, 'Прямые алгоритмы интегрирования некоторых специальных типов систем линейных дифференциальных уравнений в частных производных', 5, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (12, 1, 'Эвристические и численные методы оценивания корней нелинейных алгебраических уравнений', 5, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (11, 1, 'Башенные системы счисления. Критерий фон Неймана для оценки эффективности сжатия числовой информации', 4, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (10, 2, 'Способы представления числовой информации. Классификация традиционных и новых систем счисления', 4, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (8, 1, 'Роль математического, информационного и компьютерного моделирования в естественных, гуманитарных и социальных науках', 3, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (9, 3, 'Пакеты прикладных компьютерных программ Mathcad, MathLab и Wolfram Mathematika', 3, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (7, 2, 'Условность разделения математики на чистую и прикладную', 3, 146);
INSERT INTO public.workprogramsapp_topic VALUES (13, 2, 'Многогранники Ньютона и смешанные объёмы', 5, 41);
INSERT INTO public.workprogramsapp_topic VALUES (2, 2, 'Полина крутая', 2, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (5, 3, 'Антон тоже крутой', 2, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (16, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (17, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (18, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (19, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (20, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (21, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (22, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (23, 1, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (24, 9, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (25, 10, 'string', 1, NULL);
INSERT INTO public.workprogramsapp_topic VALUES (26, 11, 'string', 1, NULL);


--
-- Data for Name: workprogramsapp_workprogram; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_workprogram VALUES (2, 'Название дисциплины', 108, NULL, 'bachelor', '100200', '2020-06-25 12:30:31.292369+00', NULL, NULL, NULL);
INSERT INTO public.workprogramsapp_workprogram VALUES (5, 'Прикладная математика', 92, NULL, 'bachelor', 'Б1.Б22', '2020-06-25 12:30:31.292369+00', NULL, NULL, NULL);
INSERT INTO public.workprogramsapp_workprogram VALUES (1, 'sfgfg', NULL, NULL, NULL, NULL, '2020-06-25 12:30:31.292369+00', NULL, NULL, NULL);
INSERT INTO public.workprogramsapp_workprogram VALUES (3, 'Очень крутая рабочая программа', 15, 0, 'bachelor', 'Б52', '2020-06-25 12:30:31.292369+00', NULL, NULL, NULL);
INSERT INTO public.workprogramsapp_workprogram VALUES (6, 'string', 0, 0, 'bachelor', 'string', '2020-06-25 12:30:31.292369+00', NULL, NULL, NULL);


--
-- Data for Name: workprogramsapp_workprogram_bibliographic_reference; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_workprogram_bibliographic_reference VALUES (18, 5, 24);
INSERT INTO public.workprogramsapp_workprogram_bibliographic_reference VALUES (19, 5, 25);
INSERT INTO public.workprogramsapp_workprogram_bibliographic_reference VALUES (20, 5, 26);


--
-- Data for Name: workprogramsapp_workprogramchangeindisciplineblockmodule; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule VALUES (1, 11, NULL, NULL, NULL, NULL);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule VALUES (2, 12, NULL, NULL, NULL, NULL);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule VALUES (3, 10, NULL, NULL, NULL, NULL);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule VALUES (4, 10, NULL, NULL, NULL, NULL);


--
-- Data for Name: workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc VALUES (1, 1, 2);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc VALUES (2, 1, 3);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc VALUES (3, 1, 5);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc VALUES (4, 2, 3);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc VALUES (5, 3, 1);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc VALUES (6, 4, 2);
INSERT INTO public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc VALUES (7, 4, 5);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 165, true);


--
-- Name: corsheaders_corsmodel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.corsheaders_corsmodel_id_seq', 1, false);


--
-- Name: dataprocessing_domain_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_domain_id_seq', 52, true);


--
-- Name: dataprocessing_domain_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_domain_user_id_seq', 10, true);


--
-- Name: dataprocessing_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_items_id_seq', 96, true);


--
-- Name: dataprocessing_relation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_relation_id_seq', 1, false);


--
-- Name: dataprocessing_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_user_groups_id_seq', 1, false);


--
-- Name: dataprocessing_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_user_id_seq', 2, true);


--
-- Name: dataprocessing_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dataprocessing_user_user_permissions_id_seq', 88, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 256, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 66, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 165, true);


--
-- Name: django_summernote_attachment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_summernote_attachment_id_seq', 1, false);


--
-- Name: workprogramsapp_academicplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_academicplan_id_seq', 31, true);


--
-- Name: workprogramsapp_bibliographicreference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_bibliographicreference_id_seq', 30, true);


--
-- Name: workprogramsapp_certification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_certification_id_seq', 1, true);


--
-- Name: workprogramsapp_competence_field_of_study_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_competence_field_of_study_id_seq', 2, true);


--
-- Name: workprogramsapp_competence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_competence_id_seq', 3, true);


--
-- Name: workprogramsapp_competence_work_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_competence_work_program_id_seq', 2, true);


--
-- Name: workprogramsapp_disciplineblock_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_disciplineblock_id_seq', 48, true);


--
-- Name: workprogramsapp_disciplineblockmodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_disciplineblockmodule_id_seq', 22, true);


--
-- Name: workprogramsapp_disciplinesection_evaluation_tools_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_disciplinesection_evaluation_tools_id_seq', 13, true);


--
-- Name: workprogramsapp_disciplinesection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_disciplinesection_id_seq', 7, true);


--
-- Name: workprogramsapp_evaluationtool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_evaluationtool_id_seq', 15, true);


--
-- Name: workprogramsapp_fieldofstudy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_fieldofstudy_id_seq', 1, true);


--
-- Name: workprogramsapp_fieldofstudyworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_fieldofstudyworkprogram_id_seq', 1, false);


--
-- Name: workprogramsapp_implementationacademicplan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_implementationacademicplan_id_seq', 42, true);


--
-- Name: workprogramsapp_indicator_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_indicator_id_seq', 4, true);


--
-- Name: workprogramsapp_indicatorworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_indicatorworkprogram_id_seq', 1, false);


--
-- Name: workprogramsapp_onlinecourse_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_onlinecourse_id_seq', 52, true);


--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_outcomesofworkprogram_evaluation_tool_id_seq', 2, true);


--
-- Name: workprogramsapp_outcomesofworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_outcomesofworkprogram_id_seq', 5, true);


--
-- Name: workprogramsapp_prerequisitesofworkprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_prerequisitesofworkprogram_id_seq', 18, true);


--
-- Name: workprogramsapp_route_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_route_id_seq', 1, false);


--
-- Name: workprogramsapp_routecomposition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_routecomposition_id_seq', 1, false);


--
-- Name: workprogramsapp_topic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_topic_id_seq', 26, true);


--
-- Name: workprogramsapp_workprogram_bibliographic_reference_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_workprogram_bibliographic_reference_id_seq', 23, true);


--
-- Name: workprogramsapp_workprogram_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_workprogram_id_seq', 6, true);


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_workprogramchangeindisciplineblockmodul_id_seq1', 7, true);


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workprogramsapp_workprogramchangeindisciplineblockmodule_id_seq', 4, true);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: corsheaders_corsmodel corsheaders_corsmodel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.corsheaders_corsmodel
    ADD CONSTRAINT corsheaders_corsmodel_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_domain dataprocessing_domain_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_domain
    ADD CONSTRAINT dataprocessing_domain_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_domain_user dataprocessing_domain_user_domain_id_user_id_dc405431_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_domain_user
    ADD CONSTRAINT dataprocessing_domain_user_domain_id_user_id_dc405431_uniq UNIQUE (domain_id, user_id);


--
-- Name: dataprocessing_domain_user dataprocessing_domain_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_domain_user
    ADD CONSTRAINT dataprocessing_domain_user_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_items dataprocessing_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_items
    ADD CONSTRAINT dataprocessing_items_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_relation dataprocessing_relation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_relation
    ADD CONSTRAINT dataprocessing_relation_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_user_groups dataprocessing_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_groups
    ADD CONSTRAINT dataprocessing_user_groups_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_user_groups dataprocessing_user_groups_user_id_group_id_2a6c2f08_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_groups
    ADD CONSTRAINT dataprocessing_user_groups_user_id_group_id_2a6c2f08_uniq UNIQUE (user_id, group_id);


--
-- Name: dataprocessing_user dataprocessing_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user
    ADD CONSTRAINT dataprocessing_user_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_user_user_permissions dataprocessing_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_user_permissions
    ADD CONSTRAINT dataprocessing_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: dataprocessing_user_user_permissions dataprocessing_user_user_user_id_permission_id_17a05fca_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_user_permissions
    ADD CONSTRAINT dataprocessing_user_user_user_id_permission_id_17a05fca_uniq UNIQUE (user_id, permission_id);


--
-- Name: dataprocessing_user dataprocessing_user_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user
    ADD CONSTRAINT dataprocessing_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_summernote_attachment django_summernote_attachment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_summernote_attachment
    ADD CONSTRAINT django_summernote_attachment_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_academicplan workprogramsapp_academicplan_educational_profile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_academicplan
    ADD CONSTRAINT workprogramsapp_academicplan_educational_profile_key UNIQUE (educational_profile);


--
-- Name: workprogramsapp_academicplan workprogramsapp_academicplan_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_academicplan
    ADD CONSTRAINT workprogramsapp_academicplan_number_key UNIQUE (number);


--
-- Name: workprogramsapp_academicplan workprogramsapp_academicplan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_academicplan
    ADD CONSTRAINT workprogramsapp_academicplan_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_bibliographicreference workprogramsapp_bibliographicreference_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_bibliographicreference
    ADD CONSTRAINT workprogramsapp_bibliographicreference_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_certification workprogramsapp_certification_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_certification
    ADD CONSTRAINT workprogramsapp_certification_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_competence_field_of_study workprogramsapp_competen_competence_id_fieldofstu_7da3ea18_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_field_of_study
    ADD CONSTRAINT workprogramsapp_competen_competence_id_fieldofstu_7da3ea18_uniq UNIQUE (competence_id, fieldofstudy_id);


--
-- Name: workprogramsapp_competence_work_program workprogramsapp_competen_competence_id_workprogra_4532f8bd_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_work_program
    ADD CONSTRAINT workprogramsapp_competen_competence_id_workprogra_4532f8bd_uniq UNIQUE (competence_id, workprogram_id);


--
-- Name: workprogramsapp_competence_field_of_study workprogramsapp_competence_field_of_study_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_field_of_study
    ADD CONSTRAINT workprogramsapp_competence_field_of_study_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_competence workprogramsapp_competence_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence
    ADD CONSTRAINT workprogramsapp_competence_name_key UNIQUE (name);


--
-- Name: workprogramsapp_competence workprogramsapp_competence_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence
    ADD CONSTRAINT workprogramsapp_competence_number_key UNIQUE (number);


--
-- Name: workprogramsapp_competence workprogramsapp_competence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence
    ADD CONSTRAINT workprogramsapp_competence_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_competence_work_program workprogramsapp_competence_work_program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_work_program
    ADD CONSTRAINT workprogramsapp_competence_work_program_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_disciplinesection_evaluation_tools workprogramsapp_discipli_disciplinesection_id_eva_356dfa64_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection_evaluation_tools
    ADD CONSTRAINT workprogramsapp_discipli_disciplinesection_id_eva_356dfa64_uniq UNIQUE (disciplinesection_id, evaluationtool_id);


--
-- Name: workprogramsapp_disciplineblock workprogramsapp_disciplineblock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplineblock
    ADD CONSTRAINT workprogramsapp_disciplineblock_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_disciplineblockmodule workprogramsapp_disciplineblockmodule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplineblockmodule
    ADD CONSTRAINT workprogramsapp_disciplineblockmodule_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_disciplinesection_evaluation_tools workprogramsapp_disciplinesection_evaluation_tools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection_evaluation_tools
    ADD CONSTRAINT workprogramsapp_disciplinesection_evaluation_tools_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_disciplinesection workprogramsapp_disciplinesection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection
    ADD CONSTRAINT workprogramsapp_disciplinesection_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_evaluationtool workprogramsapp_evaluationtool_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_evaluationtool
    ADD CONSTRAINT workprogramsapp_evaluationtool_name_key UNIQUE (name);


--
-- Name: workprogramsapp_evaluationtool workprogramsapp_evaluationtool_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_evaluationtool
    ADD CONSTRAINT workprogramsapp_evaluationtool_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_fieldofstudy workprogramsapp_fieldofstudy_educational_profile_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudy
    ADD CONSTRAINT workprogramsapp_fieldofstudy_educational_profile_key UNIQUE (educational_profile);


--
-- Name: workprogramsapp_fieldofstudy workprogramsapp_fieldofstudy_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudy
    ADD CONSTRAINT workprogramsapp_fieldofstudy_number_key UNIQUE (number);


--
-- Name: workprogramsapp_fieldofstudy workprogramsapp_fieldofstudy_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudy
    ADD CONSTRAINT workprogramsapp_fieldofstudy_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_fieldofstudy workprogramsapp_fieldofstudy_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudy
    ADD CONSTRAINT workprogramsapp_fieldofstudy_title_key UNIQUE (title);


--
-- Name: workprogramsapp_fieldofstudyworkprogram workprogramsapp_fieldofstudyworkprogram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudyworkprogram
    ADD CONSTRAINT workprogramsapp_fieldofstudyworkprogram_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_implementationacademicplan workprogramsapp_implementationacademicplan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_implementationacademicplan
    ADD CONSTRAINT workprogramsapp_implementationacademicplan_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_indicator workprogramsapp_indicator_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicator
    ADD CONSTRAINT workprogramsapp_indicator_number_key UNIQUE (number);


--
-- Name: workprogramsapp_indicator workprogramsapp_indicator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicator
    ADD CONSTRAINT workprogramsapp_indicator_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_indicatorworkprogram workprogramsapp_indicatorworkprogram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicatorworkprogram
    ADD CONSTRAINT workprogramsapp_indicatorworkprogram_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_onlinecourse workprogramsapp_onlinecourse_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_onlinecourse
    ADD CONSTRAINT workprogramsapp_onlinecourse_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool workprogramsapp_outcomes_outcomesofworkprogram_id_db2962e1_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram_evaluation_tool
    ADD CONSTRAINT workprogramsapp_outcomes_outcomesofworkprogram_id_db2962e1_uniq UNIQUE (outcomesofworkprogram_id, evaluationtool_id);


--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool workprogramsapp_outcomesofworkprogram_evaluation_tool_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram_evaluation_tool
    ADD CONSTRAINT workprogramsapp_outcomesofworkprogram_evaluation_tool_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_outcomesofworkprogram workprogramsapp_outcomesofworkprogram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram
    ADD CONSTRAINT workprogramsapp_outcomesofworkprogram_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_prerequisitesofworkprogram workprogramsapp_prerequisitesofworkprogram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_prerequisitesofworkprogram
    ADD CONSTRAINT workprogramsapp_prerequisitesofworkprogram_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_route workprogramsapp_route_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_route
    ADD CONSTRAINT workprogramsapp_route_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_routecomposition workprogramsapp_routecom_route_id_user_id_work_pr_8eef5288_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_routecomposition
    ADD CONSTRAINT workprogramsapp_routecom_route_id_user_id_work_pr_8eef5288_uniq UNIQUE (route_id, user_id, work_program_id);


--
-- Name: workprogramsapp_routecomposition workprogramsapp_routecomposition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_routecomposition
    ADD CONSTRAINT workprogramsapp_routecomposition_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_topic workprogramsapp_topic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_topic
    ADD CONSTRAINT workprogramsapp_topic_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_workprogram_bibliographic_reference workprogramsapp_workprog_workprogram_id_bibliogra_cb802bcd_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogram_bibliographic_reference
    ADD CONSTRAINT workprogramsapp_workprog_workprogram_id_bibliogra_cb802bcd_uniq UNIQUE (workprogram_id, bibliographicreference_id);


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc workprogramsapp_workprog_workprogramchangeindisci_74d26e9c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc
    ADD CONSTRAINT workprogramsapp_workprog_workprogramchangeindisci_74d26e9c_uniq UNIQUE (workprogramchangeindisciplineblockmodule_id, workprogram_id);


--
-- Name: workprogramsapp_workprogram_bibliographic_reference workprogramsapp_workprogram_bibliographic_reference_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogram_bibliographic_reference
    ADD CONSTRAINT workprogramsapp_workprogram_bibliographic_reference_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_workprogram workprogramsapp_workprogram_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogram
    ADD CONSTRAINT workprogramsapp_workprogram_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule workprogramsapp_workprogramchangeindisciplineblockmodule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule
    ADD CONSTRAINT workprogramsapp_workprogramchangeindisciplineblockmodule_pkey PRIMARY KEY (id);


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc workprogramsapp_workprogramchangeindisciplineblockmodule_w_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc
    ADD CONSTRAINT workprogramsapp_workprogramchangeindisciplineblockmodule_w_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: dataprocessing_domain_user_domain_id_ba9dec1b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_domain_user_domain_id_ba9dec1b ON public.dataprocessing_domain_user USING btree (domain_id);


--
-- Name: dataprocessing_domain_user_user_id_b54d81d4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_domain_user_user_id_b54d81d4 ON public.dataprocessing_domain_user USING btree (user_id);


--
-- Name: dataprocessing_items_author_id_1d7b676e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_items_author_id_1d7b676e ON public.dataprocessing_items USING btree (author_id);


--
-- Name: dataprocessing_items_domain_id_f5fc0c54; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_items_domain_id_f5fc0c54 ON public.dataprocessing_items USING btree (domain_id);


--
-- Name: dataprocessing_relation_item1_id_88febd4a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_relation_item1_id_88febd4a ON public.dataprocessing_relation USING btree (item1_id);


--
-- Name: dataprocessing_relation_item2_id_6dbeb3a7; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_relation_item2_id_6dbeb3a7 ON public.dataprocessing_relation USING btree (item2_id);


--
-- Name: dataprocessing_user_groups_group_id_ba444361; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_user_groups_group_id_ba444361 ON public.dataprocessing_user_groups USING btree (group_id);


--
-- Name: dataprocessing_user_groups_user_id_fefab0f1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_user_groups_user_id_fefab0f1 ON public.dataprocessing_user_groups USING btree (user_id);


--
-- Name: dataprocessing_user_user_permissions_permission_id_06b66242; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_user_user_permissions_permission_id_06b66242 ON public.dataprocessing_user_user_permissions USING btree (permission_id);


--
-- Name: dataprocessing_user_user_permissions_user_id_8a65535c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_user_user_permissions_user_id_8a65535c ON public.dataprocessing_user_user_permissions USING btree (user_id);


--
-- Name: dataprocessing_user_username_79e0a0b6_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX dataprocessing_user_username_79e0a0b6_like ON public.dataprocessing_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: workprogramsapp_academicplan_educational_profile_cd6daf2d_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_academicplan_educational_profile_cd6daf2d_like ON public.workprogramsapp_academicplan USING btree (educational_profile varchar_pattern_ops);


--
-- Name: workprogramsapp_academicplan_number_79749067_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_academicplan_number_79749067_like ON public.workprogramsapp_academicplan USING btree (number varchar_pattern_ops);


--
-- Name: workprogramsapp_certification_work_program_id_7bd5a405; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_certification_work_program_id_7bd5a405 ON public.workprogramsapp_certification USING btree (work_program_id);


--
-- Name: workprogramsapp_competence_competence_id_9ad5f9c6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_competence_competence_id_9ad5f9c6 ON public.workprogramsapp_competence_field_of_study USING btree (competence_id);


--
-- Name: workprogramsapp_competence_fieldofstudy_id_5e0d8f7c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_competence_fieldofstudy_id_5e0d8f7c ON public.workprogramsapp_competence_field_of_study USING btree (fieldofstudy_id);


--
-- Name: workprogramsapp_competence_name_b7c750c2_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_competence_name_b7c750c2_like ON public.workprogramsapp_competence USING btree (name varchar_pattern_ops);


--
-- Name: workprogramsapp_competence_number_a7460fd7_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_competence_number_a7460fd7_like ON public.workprogramsapp_competence USING btree (number varchar_pattern_ops);


--
-- Name: workprogramsapp_competence_work_program_competence_id_e6535b8c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_competence_work_program_competence_id_e6535b8c ON public.workprogramsapp_competence_work_program USING btree (competence_id);


--
-- Name: workprogramsapp_competence_work_program_workprogram_id_2129a05d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_competence_work_program_workprogram_id_2129a05d ON public.workprogramsapp_competence_work_program USING btree (workprogram_id);


--
-- Name: workprogramsapp_discipline_descipline_block_id_b15ba832; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_discipline_descipline_block_id_b15ba832 ON public.workprogramsapp_disciplineblockmodule USING btree (descipline_block_id);


--
-- Name: workprogramsapp_discipline_disciplinesection_id_83282399; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_discipline_disciplinesection_id_83282399 ON public.workprogramsapp_disciplinesection_evaluation_tools USING btree (disciplinesection_id);


--
-- Name: workprogramsapp_discipline_evaluationtool_id_82679de1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_discipline_evaluationtool_id_82679de1 ON public.workprogramsapp_disciplinesection_evaluation_tools USING btree (evaluationtool_id);


--
-- Name: workprogramsapp_disciplineblock_academic_plan_id_6a0f4e84; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_disciplineblock_academic_plan_id_6a0f4e84 ON public.workprogramsapp_disciplineblock USING btree (academic_plan_id);


--
-- Name: workprogramsapp_disciplinesection_work_program_id_f2b33470; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_disciplinesection_work_program_id_f2b33470 ON public.workprogramsapp_disciplinesection USING btree (work_program_id);


--
-- Name: workprogramsapp_evaluationtool_name_5219c939_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_evaluationtool_name_5219c939_like ON public.workprogramsapp_evaluationtool USING btree (name varchar_pattern_ops);


--
-- Name: workprogramsapp_fieldofstu_field_of_study_id_0f946b19; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_fieldofstu_field_of_study_id_0f946b19 ON public.workprogramsapp_fieldofstudyworkprogram USING btree (field_of_study_id);


--
-- Name: workprogramsapp_fieldofstu_work_program_id_176be452; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_fieldofstu_work_program_id_176be452 ON public.workprogramsapp_fieldofstudyworkprogram USING btree (work_program_id);


--
-- Name: workprogramsapp_fieldofstudy_educational_profile_d55d340c_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_fieldofstudy_educational_profile_d55d340c_like ON public.workprogramsapp_fieldofstudy USING btree (educational_profile varchar_pattern_ops);


--
-- Name: workprogramsapp_fieldofstudy_number_7c6edfdc_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_fieldofstudy_number_7c6edfdc_like ON public.workprogramsapp_fieldofstudy USING btree (number varchar_pattern_ops);


--
-- Name: workprogramsapp_fieldofstudy_title_eca45e80_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_fieldofstudy_title_eca45e80_like ON public.workprogramsapp_fieldofstudy USING btree (title varchar_pattern_ops);


--
-- Name: workprogramsapp_implementa_academic_plan_id_07c8d0a6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_implementa_academic_plan_id_07c8d0a6 ON public.workprogramsapp_implementationacademicplan USING btree (academic_plan_id);


--
-- Name: workprogramsapp_implementa_field_of_study_id_5784b81a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_implementa_field_of_study_id_5784b81a ON public.workprogramsapp_implementationacademicplan USING btree (field_of_study_id);


--
-- Name: workprogramsapp_indicator_competence_id_6735bb38; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_indicator_competence_id_6735bb38 ON public.workprogramsapp_indicator USING btree (competence_id);


--
-- Name: workprogramsapp_indicator_number_ae14f766_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_indicator_number_ae14f766_like ON public.workprogramsapp_indicator USING btree (number varchar_pattern_ops);


--
-- Name: workprogramsapp_indicatorworkprogram_indicator_id_43307985; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_indicatorworkprogram_indicator_id_43307985 ON public.workprogramsapp_indicatorworkprogram USING btree (indicator_id);


--
-- Name: workprogramsapp_indicatorworkprogram_work_program_id_88f08d79; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_indicatorworkprogram_work_program_id_88f08d79 ON public.workprogramsapp_indicatorworkprogram USING btree (work_program_id);


--
-- Name: workprogramsapp_outcomesof_evaluationtool_id_37fc5b62; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_outcomesof_evaluationtool_id_37fc5b62 ON public.workprogramsapp_outcomesofworkprogram_evaluation_tool USING btree (evaluationtool_id);


--
-- Name: workprogramsapp_outcomesof_outcomesofworkprogram_id_57d71843; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_outcomesof_outcomesofworkprogram_id_57d71843 ON public.workprogramsapp_outcomesofworkprogram_evaluation_tool USING btree (outcomesofworkprogram_id);


--
-- Name: workprogramsapp_outcomesofworkprogram_item_id_afc2930e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_outcomesofworkprogram_item_id_afc2930e ON public.workprogramsapp_outcomesofworkprogram USING btree (item_id);


--
-- Name: workprogramsapp_outcomesofworkprogram_workprogram_id_05cb83af; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_outcomesofworkprogram_workprogram_id_05cb83af ON public.workprogramsapp_outcomesofworkprogram USING btree (workprogram_id);


--
-- Name: workprogramsapp_prerequisi_workprogram_id_487228e8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_prerequisi_workprogram_id_487228e8 ON public.workprogramsapp_prerequisitesofworkprogram USING btree (workprogram_id);


--
-- Name: workprogramsapp_prerequisitesofworkprogram_item_id_2ea95159; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_prerequisitesofworkprogram_item_id_2ea95159 ON public.workprogramsapp_prerequisitesofworkprogram USING btree (item_id);


--
-- Name: workprogramsapp_route_field_of_study_id_014734b2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_route_field_of_study_id_014734b2 ON public.workprogramsapp_route USING btree (field_of_study_id);


--
-- Name: workprogramsapp_route_user_id_1916a697; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_route_user_id_1916a697 ON public.workprogramsapp_route USING btree (user_id);


--
-- Name: workprogramsapp_routecomposition_field_of_study_id_5e536c59; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_routecomposition_field_of_study_id_5e536c59 ON public.workprogramsapp_routecomposition USING btree (field_of_study_id);


--
-- Name: workprogramsapp_routecomposition_route_id_a518a0f8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_routecomposition_route_id_a518a0f8 ON public.workprogramsapp_routecomposition USING btree (route_id);


--
-- Name: workprogramsapp_routecomposition_user_id_8ec9c4af; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_routecomposition_user_id_8ec9c4af ON public.workprogramsapp_routecomposition USING btree (user_id);


--
-- Name: workprogramsapp_routecomposition_work_program_id_814004fd; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_routecomposition_work_program_id_814004fd ON public.workprogramsapp_routecomposition USING btree (work_program_id);


--
-- Name: workprogramsapp_topic_discipline_section_id_d13e658d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_topic_discipline_section_id_d13e658d ON public.workprogramsapp_topic USING btree (discipline_section_id);


--
-- Name: workprogramsapp_topic_url_online_course_id_151f7681; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_topic_url_online_course_id_151f7681 ON public.workprogramsapp_topic USING btree (url_online_course_id);


--
-- Name: workprogramsapp_workprogra_bibliographicreference_id_933eab15; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_workprogra_bibliographicreference_id_933eab15 ON public.workprogramsapp_workprogram_bibliographic_reference USING btree (bibliographicreference_id);


--
-- Name: workprogramsapp_workprogra_discipline_block_module_id_d78c4d64; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_workprogra_discipline_block_module_id_d78c4d64 ON public.workprogramsapp_workprogramchangeindisciplineblockmodule USING btree (discipline_block_module_id);


--
-- Name: workprogramsapp_workprogra_workprogram_id_5cf45d23; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_workprogra_workprogram_id_5cf45d23 ON public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc USING btree (workprogram_id);


--
-- Name: workprogramsapp_workprogra_workprogram_id_9a097e2a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_workprogra_workprogram_id_9a097e2a ON public.workprogramsapp_workprogram_bibliographic_reference USING btree (workprogram_id);


--
-- Name: workprogramsapp_workprogra_workprogramchangeindiscipl_b8e30088; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX workprogramsapp_workprogra_workprogramchangeindiscipl_b8e30088 ON public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc USING btree (workprogramchangeindisciplineblockmodule_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_dataprocessing_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_dataprocessing_user_id FOREIGN KEY (user_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_domain_user dataprocessing_domai_domain_id_ba9dec1b_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_domain_user
    ADD CONSTRAINT dataprocessing_domai_domain_id_ba9dec1b_fk_dataproce FOREIGN KEY (domain_id) REFERENCES public.dataprocessing_domain(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_domain_user dataprocessing_domai_user_id_b54d81d4_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_domain_user
    ADD CONSTRAINT dataprocessing_domai_user_id_b54d81d4_fk_dataproce FOREIGN KEY (user_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_items dataprocessing_items_author_id_1d7b676e_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_items
    ADD CONSTRAINT dataprocessing_items_author_id_1d7b676e_fk_dataproce FOREIGN KEY (author_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_items dataprocessing_items_domain_id_f5fc0c54_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_items
    ADD CONSTRAINT dataprocessing_items_domain_id_f5fc0c54_fk_dataproce FOREIGN KEY (domain_id) REFERENCES public.dataprocessing_domain(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_relation dataprocessing_relat_item1_id_88febd4a_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_relation
    ADD CONSTRAINT dataprocessing_relat_item1_id_88febd4a_fk_dataproce FOREIGN KEY (item1_id) REFERENCES public.dataprocessing_items(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_relation dataprocessing_relat_item2_id_6dbeb3a7_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_relation
    ADD CONSTRAINT dataprocessing_relat_item2_id_6dbeb3a7_fk_dataproce FOREIGN KEY (item2_id) REFERENCES public.dataprocessing_items(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_user_user_permissions dataprocessing_user__permission_id_06b66242_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_user_permissions
    ADD CONSTRAINT dataprocessing_user__permission_id_06b66242_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_user_user_permissions dataprocessing_user__user_id_8a65535c_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_user_permissions
    ADD CONSTRAINT dataprocessing_user__user_id_8a65535c_fk_dataproce FOREIGN KEY (user_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_user_groups dataprocessing_user__user_id_fefab0f1_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_groups
    ADD CONSTRAINT dataprocessing_user__user_id_fefab0f1_fk_dataproce FOREIGN KEY (user_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: dataprocessing_user_groups dataprocessing_user_groups_group_id_ba444361_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dataprocessing_user_groups
    ADD CONSTRAINT dataprocessing_user_groups_group_id_ba444361_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_dataprocessing_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_dataprocessing_user_id FOREIGN KEY (user_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_certification workprogramsapp_cert_work_program_id_7bd5a405_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_certification
    ADD CONSTRAINT workprogramsapp_cert_work_program_id_7bd5a405_fk_workprogr FOREIGN KEY (work_program_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_competence_field_of_study workprogramsapp_comp_competence_id_9ad5f9c6_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_field_of_study
    ADD CONSTRAINT workprogramsapp_comp_competence_id_9ad5f9c6_fk_workprogr FOREIGN KEY (competence_id) REFERENCES public.workprogramsapp_competence(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_competence_work_program workprogramsapp_comp_competence_id_e6535b8c_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_work_program
    ADD CONSTRAINT workprogramsapp_comp_competence_id_e6535b8c_fk_workprogr FOREIGN KEY (competence_id) REFERENCES public.workprogramsapp_competence(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_competence_field_of_study workprogramsapp_comp_fieldofstudy_id_5e0d8f7c_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_field_of_study
    ADD CONSTRAINT workprogramsapp_comp_fieldofstudy_id_5e0d8f7c_fk_workprogr FOREIGN KEY (fieldofstudy_id) REFERENCES public.workprogramsapp_fieldofstudy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_competence_work_program workprogramsapp_comp_workprogram_id_2129a05d_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_competence_work_program
    ADD CONSTRAINT workprogramsapp_comp_workprogram_id_2129a05d_fk_workprogr FOREIGN KEY (workprogram_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_disciplineblock workprogramsapp_disc_academic_plan_id_6a0f4e84_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplineblock
    ADD CONSTRAINT workprogramsapp_disc_academic_plan_id_6a0f4e84_fk_workprogr FOREIGN KEY (academic_plan_id) REFERENCES public.workprogramsapp_academicplan(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_disciplineblockmodule workprogramsapp_disc_descipline_block_id_b15ba832_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplineblockmodule
    ADD CONSTRAINT workprogramsapp_disc_descipline_block_id_b15ba832_fk_workprogr FOREIGN KEY (descipline_block_id) REFERENCES public.workprogramsapp_disciplineblock(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_disciplinesection_evaluation_tools workprogramsapp_disc_disciplinesection_id_83282399_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection_evaluation_tools
    ADD CONSTRAINT workprogramsapp_disc_disciplinesection_id_83282399_fk_workprogr FOREIGN KEY (disciplinesection_id) REFERENCES public.workprogramsapp_disciplinesection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_disciplinesection_evaluation_tools workprogramsapp_disc_evaluationtool_id_82679de1_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection_evaluation_tools
    ADD CONSTRAINT workprogramsapp_disc_evaluationtool_id_82679de1_fk_workprogr FOREIGN KEY (evaluationtool_id) REFERENCES public.workprogramsapp_evaluationtool(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_disciplinesection workprogramsapp_disc_work_program_id_f2b33470_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_disciplinesection
    ADD CONSTRAINT workprogramsapp_disc_work_program_id_f2b33470_fk_workprogr FOREIGN KEY (work_program_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_fieldofstudyworkprogram workprogramsapp_fiel_field_of_study_id_0f946b19_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudyworkprogram
    ADD CONSTRAINT workprogramsapp_fiel_field_of_study_id_0f946b19_fk_workprogr FOREIGN KEY (field_of_study_id) REFERENCES public.workprogramsapp_fieldofstudy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_fieldofstudyworkprogram workprogramsapp_fiel_work_program_id_176be452_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_fieldofstudyworkprogram
    ADD CONSTRAINT workprogramsapp_fiel_work_program_id_176be452_fk_workprogr FOREIGN KEY (work_program_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_implementationacademicplan workprogramsapp_impl_academic_plan_id_07c8d0a6_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_implementationacademicplan
    ADD CONSTRAINT workprogramsapp_impl_academic_plan_id_07c8d0a6_fk_workprogr FOREIGN KEY (academic_plan_id) REFERENCES public.workprogramsapp_academicplan(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_implementationacademicplan workprogramsapp_impl_field_of_study_id_5784b81a_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_implementationacademicplan
    ADD CONSTRAINT workprogramsapp_impl_field_of_study_id_5784b81a_fk_workprogr FOREIGN KEY (field_of_study_id) REFERENCES public.workprogramsapp_fieldofstudy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_indicator workprogramsapp_indi_competence_id_6735bb38_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicator
    ADD CONSTRAINT workprogramsapp_indi_competence_id_6735bb38_fk_workprogr FOREIGN KEY (competence_id) REFERENCES public.workprogramsapp_competence(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_indicatorworkprogram workprogramsapp_indi_indicator_id_43307985_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicatorworkprogram
    ADD CONSTRAINT workprogramsapp_indi_indicator_id_43307985_fk_workprogr FOREIGN KEY (indicator_id) REFERENCES public.workprogramsapp_indicator(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_indicatorworkprogram workprogramsapp_indi_work_program_id_88f08d79_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_indicatorworkprogram
    ADD CONSTRAINT workprogramsapp_indi_work_program_id_88f08d79_fk_workprogr FOREIGN KEY (work_program_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool workprogramsapp_outc_evaluationtool_id_37fc5b62_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram_evaluation_tool
    ADD CONSTRAINT workprogramsapp_outc_evaluationtool_id_37fc5b62_fk_workprogr FOREIGN KEY (evaluationtool_id) REFERENCES public.workprogramsapp_evaluationtool(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_outcomesofworkprogram workprogramsapp_outc_item_id_afc2930e_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram
    ADD CONSTRAINT workprogramsapp_outc_item_id_afc2930e_fk_dataproce FOREIGN KEY (item_id) REFERENCES public.dataprocessing_items(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_outcomesofworkprogram_evaluation_tool workprogramsapp_outc_outcomesofworkprogra_57d71843_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram_evaluation_tool
    ADD CONSTRAINT workprogramsapp_outc_outcomesofworkprogra_57d71843_fk_workprogr FOREIGN KEY (outcomesofworkprogram_id) REFERENCES public.workprogramsapp_outcomesofworkprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_outcomesofworkprogram workprogramsapp_outc_workprogram_id_05cb83af_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_outcomesofworkprogram
    ADD CONSTRAINT workprogramsapp_outc_workprogram_id_05cb83af_fk_workprogr FOREIGN KEY (workprogram_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_prerequisitesofworkprogram workprogramsapp_prer_item_id_2ea95159_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_prerequisitesofworkprogram
    ADD CONSTRAINT workprogramsapp_prer_item_id_2ea95159_fk_dataproce FOREIGN KEY (item_id) REFERENCES public.dataprocessing_items(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_prerequisitesofworkprogram workprogramsapp_prer_workprogram_id_487228e8_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_prerequisitesofworkprogram
    ADD CONSTRAINT workprogramsapp_prer_workprogram_id_487228e8_fk_workprogr FOREIGN KEY (workprogram_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_route workprogramsapp_rout_field_of_study_id_014734b2_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_route
    ADD CONSTRAINT workprogramsapp_rout_field_of_study_id_014734b2_fk_workprogr FOREIGN KEY (field_of_study_id) REFERENCES public.workprogramsapp_fieldofstudy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_routecomposition workprogramsapp_rout_field_of_study_id_5e536c59_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_routecomposition
    ADD CONSTRAINT workprogramsapp_rout_field_of_study_id_5e536c59_fk_workprogr FOREIGN KEY (field_of_study_id) REFERENCES public.workprogramsapp_fieldofstudy(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_routecomposition workprogramsapp_rout_route_id_a518a0f8_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_routecomposition
    ADD CONSTRAINT workprogramsapp_rout_route_id_a518a0f8_fk_workprogr FOREIGN KEY (route_id) REFERENCES public.workprogramsapp_route(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_route workprogramsapp_rout_user_id_1916a697_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_route
    ADD CONSTRAINT workprogramsapp_rout_user_id_1916a697_fk_dataproce FOREIGN KEY (user_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_routecomposition workprogramsapp_rout_user_id_8ec9c4af_fk_dataproce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_routecomposition
    ADD CONSTRAINT workprogramsapp_rout_user_id_8ec9c4af_fk_dataproce FOREIGN KEY (user_id) REFERENCES public.dataprocessing_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_routecomposition workprogramsapp_rout_work_program_id_814004fd_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_routecomposition
    ADD CONSTRAINT workprogramsapp_rout_work_program_id_814004fd_fk_workprogr FOREIGN KEY (work_program_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_topic workprogramsapp_topi_discipline_section_i_d13e658d_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_topic
    ADD CONSTRAINT workprogramsapp_topi_discipline_section_i_d13e658d_fk_workprogr FOREIGN KEY (discipline_section_id) REFERENCES public.workprogramsapp_disciplinesection(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_topic workprogramsapp_topi_url_online_course_id_151f7681_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_topic
    ADD CONSTRAINT workprogramsapp_topi_url_online_course_id_151f7681_fk_workprogr FOREIGN KEY (url_online_course_id) REFERENCES public.workprogramsapp_onlinecourse(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_workprogram_bibliographic_reference workprogramsapp_work_bibliographicreferen_933eab15_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogram_bibliographic_reference
    ADD CONSTRAINT workprogramsapp_work_bibliographicreferen_933eab15_fk_workprogr FOREIGN KEY (bibliographicreference_id) REFERENCES public.workprogramsapp_bibliographicreference(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule workprogramsapp_work_discipline_block_mod_d78c4d64_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule
    ADD CONSTRAINT workprogramsapp_work_discipline_block_mod_d78c4d64_fk_workprogr FOREIGN KEY (discipline_block_module_id) REFERENCES public.workprogramsapp_disciplineblockmodule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc workprogramsapp_work_workprogram_id_5cf45d23_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc
    ADD CONSTRAINT workprogramsapp_work_workprogram_id_5cf45d23_fk_workprogr FOREIGN KEY (workprogram_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_workprogram_bibliographic_reference workprogramsapp_work_workprogram_id_9a097e2a_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogram_bibliographic_reference
    ADD CONSTRAINT workprogramsapp_work_workprogram_id_9a097e2a_fk_workprogr FOREIGN KEY (workprogram_id) REFERENCES public.workprogramsapp_workprogram(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc workprogramsapp_work_workprogramchangeind_b8e30088_fk_workprogr; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workprogramsapp_workprogramchangeindisciplineblockmodule_wo57fc
    ADD CONSTRAINT workprogramsapp_work_workprogramchangeind_b8e30088_fk_workprogr FOREIGN KEY (workprogramchangeindisciplineblockmodule_id) REFERENCES public.workprogramsapp_workprogramchangeindisciplineblockmodule(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

