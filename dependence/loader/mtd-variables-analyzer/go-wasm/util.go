package main

import (
    "log"
    "regexp"
    "strings"
)


type LineInfo struct {
    name string
    label string
}

func (lineInfo *LineInfo) GetName() string {
    return lineInfo.name
}

func (lineInfo *LineInfo) GetLabel() string {
    return lineInfo.label
}

func NewLineInfo(line string, token string) *LineInfo {
    result := make([]string, 2)
    list := strings.Split(line, token)
    list = strings.Split(strings.Trim(list[1], " "), " ")
    if len(list) == 2 {
        result = list
    } else if len(list) == 1 {
        result = []string{list[0], list[0]}
    }
     return &LineInfo{
        name: result[0],
        label: result[1],
    }
}


func IsCommonComment(line string) bool {
    pattern := "\\ [^@ ]+"
    reg, err := regexp.Compile(pattern)
    if err != nil {
        log.Fatal(err)
    }
    isMatch := reg.MatchString(line)
    return isMatch
}


func NoOp(line string) bool {
    return line == "" || IsCommonComment(line)
}


