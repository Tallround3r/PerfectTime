# PerfectTime<br/>Test Plan
**Version 1.0**

## Table of Contents

[1. Introduction](#1-introduction)<br/>
&emsp; [1.1 Purpose](#11-purpose)<br/>
&emsp; [1.2 Scope](#12-scope)<br/>
&emsp; [1.3 Intended Audience](#13-intended-audience)<br/>
&emsp; [1.4 Document Terminology and Acronyms](#14-document-terminology-and-acronyms)<br/>
&emsp; [1.5  References](#15--references)<br/>
&emsp; [1.6 Document Structure](#16-document-structure)<br/>
[2. Evaluation Mission and Test Motivation](#2-evaluation-mission-and-test-motivation)<br/>
&emsp; [2.1 Background](#21-background)<br/>
&emsp; [2.2 Evaluation Mission](#22-evaluation-mission)<br/>
&emsp; [2.3 Test Motivators](#23-test-motivators)<br/>
[3. Target Test Items](#3-target-test-items)<br/>
[4. Outline of Planned Tests](#4-outline-of-planned-tests)<br/>
&emsp; [4.1 Outline of Test Inclusions](#41-outline-of-test-inclusions)<br/>
&emsp; [4.2 Outline of Other Candidates for Potential Inclusion](#42-outline-of-other-candidates-for-potential-inclusion)<br/>
&emsp; [4.3 Outline of Test Exclusions](#43-outline-of-test-exclusions)<br/>
[5. Test Approach](#5-test-approach)<br/>
&emsp; [5.1 Initial Test-Idea Catalogs and Other Reference Sources](#51-initial-test-idea-catalogs-and-other-reference-sources)<br/>
&emsp; [5.2 Testing Techniques and Types](#52-testing-techniques-and-types)<br/>
&emsp; &emsp; [5.2.1 Data and Database Integrity Testing](#521-data-and-database-integrity-testing)<br/>
&emsp; &emsp; [5.2.2 Function Testing](#522-function-testing)<br/>
&emsp; &emsp; [5.2.3 Business Cycle Testing](#523-business-cycle-testing)<br/>
&emsp; &emsp; [5.2.4 User Interface Testing](#524-user-interface-testing)<br/>
&emsp; &emsp; [5.2.5 Performance Profiling ](#525-performance-profiling-)<br/>
&emsp; &emsp; [5.2.6 Load Testing](#526-load-testing)<br/>
&emsp; &emsp; [5.2.7 Stress Testing](#527-stress-testing)<br/>
&emsp; &emsp; [5.2.8 Volume Testing](#528-volume-testing)<br/>
&emsp; &emsp; [5.2.9 Security and Access Control Testing](#529-security-and-access-control-testing)<br/>
&emsp; &emsp; [5.2.10 Failover and Recovery Testing](#5210-failover-and-recovery-testing)<br/>
&emsp; &emsp; [5.2.11 Configuration Testing](#5211-configuration-testing)<br/>
&emsp; &emsp; [5.2.12 Installation Testing](#5212-installation-testing)<br/>
[6. Entry and Exit Criteria](#6-entry-and-exit-criteria)<br/>
&emsp; [6.1 Test Plan](#61-test-plan)<br/>
&emsp; &emsp; [6.1.1 Test Plan Entry Criteria](#611-test-plan-entry-criteria)<br/>
&emsp; &emsp; [6.1.2 Test Plan Exit Criteria](#612-test-plan-exit-criteria)<br/>
&emsp; &emsp; [6.1.3  Suspension and Resumption Criteria](#613--suspension-and-resumption-criteria)<br/>
&emsp; [6.2 Test Cycles](#62-test-cycles)<br/>
&emsp; &emsp; [6.2.1 Test Cycle Entry Criteria](#621-test-cycle-entry-criteria)<br/>
&emsp; &emsp; [6.2.2 Test Cycle Exit Criteria](#622-test-cycle-exit-criteria)<br/>
&emsp; &emsp; [6.2.3 Test Cycle Abnormal Termination](#623-test-cycle-abnormal-termination)<br/>
[7. Deliverables](#7-deliverables)<br/>
&emsp; [7.1 Test Evaluation Summaries](#71-test-evaluation-summaries)<br/>
&emsp; [7.2 Reporting on Test Coverage](#72-reporting-on-test-coverage)<br/>
&emsp; [7.3 Perceived Quality Reports](#73-perceived-quality-reports)<br/>
&emsp; [7.4 Incident Logs and Change Requests](#74-incident-logs-and-change-requests)<br/>
&emsp; [7.5 Smoke Test Suite and Supporting Test Scripts](#75-smoke-test-suite-and-supporting-test-scripts)<br/>
&emsp; [7.6 Additional Work Products](#76-additional-work-products)<br/>
&emsp; &emsp; [7.6.1 Detailed Test Results](#761-detailed-test-results)<br/>
&emsp; &emsp; [7.6.2 Additional Automated Functional Test Scripts](#762-additional-automated-functional-test-scripts)<br/>
&emsp; &emsp; [7.6.3 Test Guidelines](#763-test-guidelines)<br/>
&emsp; &emsp; [7.6.4 Traceability Matrices](#764-traceability-matrices)<br/>
[8. Testing Workflow](#8-testing-workflow)<br/>
[9. Environmental Needs](#9-environmental-needs)<br/>
&emsp; [9.1 Base System Hardware](#91-base-system-hardware)<br/>
&emsp; [9.2 Base Software Elements in the Test Environment](#92-base-software-elements-in-the-test-environment)<br/>
&emsp; [9.3 Productivity and Support Tools](#93-productivity-and-support-tools)<br/>
&emsp; [9.4 Test Environment Configurations](#94-test-environment-configurations)<br/>
[10. Responsibilities, Staffing, and Training Needs](#10-responsibilities--staffing--and-training-needs)<br/>
&emsp; [10.1 People and Roles](#101-people-and-roles)<br/>
&emsp; [10.2 Staffing and Training Needs](#102-staffing-and-training-needs)<br/>
[11. Iteration Milestones](#11-iteration-milestones)<br/>
[12. Risks, Dependencies, Assumptions, and Constraints](#12-risks--dependencies--assumptions--and-constraints)<br/>
[13. Management Process and Procedures](#13-management-process-and-procedures)<br/>
&emsp; [13.1 Measuring and Assessing the Extent of Testing](#131-measuring-and-assessing-the-extent-of-testing)<br/>
&emsp; [13.2 Assessing the Deliverables of this Test Plan](#132-assessing-the-deliverables-of-this-test-plan)<br/>
&emsp; [13.3 Problem Reporting, Escalation, and Issue Resolution](#133-problem-reporting--escalation--and-issue-resolution)<br/>
&emsp; [13.4 Managing Test Cycles](#134-managing-test-cycles)<br/>
&emsp; [13.5 Traceability Strategies](#135-traceability-strategies)<br/>
&emsp; [13.6 Approval and Signoff](#136-approval-and-signoff)<br/>
[](#-)<br/>
[](#-)<br/>


## 1. Introduction

### 1.1 Purpose

### 1.2 Scope

### 1.3 Intended Audience

### 1.4 Document Terminology and Acronyms

### 1.5  References

### 1.6 Document Structure

## 2. Evaluation Mission and Test Motivation

### 2.1 Background

### 2.2 Evaluation Mission

### 2.3 Test Motivators

## 3. Target Test Items

## 4. Outline of Planned Tests

### 4.1 Outline of Test Inclusions

### 4.2 Outline of Other Candidates for Potential Inclusion

### 4.3 Outline of Test Exclusions

## 5. Test Approach

### 5.1 Initial Test-Idea Catalogs and Other Reference Sources

### 5.2 Testing Techniques and Types

#### 5.2.1 Data and Database Integrity Testing

#### 5.2.2 Function Testing

#### 5.2.3 Business Cycle Testing

#### 5.2.4 User Interface Testing

#### 5.2.5 Performance Profiling

#### 5.2.6 Load Testing

#### 5.2.7 Stress Testing

#### 5.2.8 Volume Testing

#### 5.2.9 Security and Access Control Testing

#### 5.2.10 Failover and Recovery Testing

#### 5.2.11 Configuration Testing

#### 5.2.12 Installation Testing

## 6. Entry and Exit Criteria

### 6.1 Test Plan

#### 6.1.1 Test Plan Entry Criteria

#### 6.1.2 Test Plan Exit Criteria

#### 6.1.3  Suspension and Resumption Criteria

### 6.2 Test Cycles

#### 6.2.1 Test Cycle Entry Criteria

#### 6.2.2 Test Cycle Exit Criteria

#### 6.2.3 Test Cycle Abnormal Termination

## 7. Deliverables

### 7.1 Test Evaluation Summaries

### 7.2 Reporting on Test Coverage

### 7.3 Perceived Quality Reports

### 7.4 Incident Logs and Change Requests

### 7.5 Smoke Test Suite and Supporting Test Scripts

### 7.6 Additional Work Products

#### 7.6.1 Detailed Test Results

#### 7.6.2 Additional Automated Functional Test Scripts

#### 7.6.3 Test Guidelines

#### 7.6.4 Traceability Matrices

## 8. Testing Workflow

## 9. Environmental Needs

### 9.1 Base System Hardware

### 9.2 Base Software Elements in the Test Environment

### 9.3 Productivity and Support Tools

### 9.4 Test Environment Configurations

## 10. Responsibilities, Staffing, and Training Needs

### 10.1 People and Roles

### 10.2 Staffing and Training Needs

## 11. Iteration Milestones

## 12. Risks, Dependencies, Assumptions, and Constraints
