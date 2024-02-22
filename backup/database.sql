--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.account (
    id character varying(255) NOT NULL,
    "firstName" character varying,
    "lastName" character varying,
    email character varying,
    phone character varying,
    password character varying,
    birthday date,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "lastModified" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.account OWNER TO postgres;

--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.account (id, "firstName", "lastName", email, phone, password, birthday, "createdAt", "lastModified") FROM stdin;
qgk1pBHxBAW3369IaCCWpIBQuBM2	Crystal	System	cs@solution.com	+923331234567	$argon2id$v=19$m=65536,t=3,p=4$C3jwpEG3VS3r20IkgLB5Jg$mZegqjzL6fPiHpfjcYq71sMw+t4+AUwXH61x8bKMPFk	1990-01-01	2024-02-23 00:40:38.065285	2024-02-23 00:40:38.065285
9zgQ5QoFaVSRxxl9nYv5PgwCOYo1	Crystal	System	owaisahmed092@gmail.com	+923331234567	$argon2id$v=19$m=65536,t=3,p=4$dd0+lmH+T2gczbf801o7Ug$fnYh0Yb1HTK2R7R+G7maNh3Ug0FEuE6fVGmoOy4r7P4	1990-01-01	2024-02-23 01:24:49.708184	2024-02-23 01:24:49.708184
\.


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

