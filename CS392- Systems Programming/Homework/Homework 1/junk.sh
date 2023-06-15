#!/bin/bash
# command.sh

#I pledge my honor that I have abided by the Stevens Honor System.
#Octavio Morales

readonly Shudong=~/.junk
flagh=0
flagl=0
flagp=0


if ! [ -d "$Shudong" ]; then
    mkdir "$Shudong"
fi

function h_helper() {
    cat<< EOF
Usage: $(basename $0) [-hlp] [list of files]
   -h: Display help.
   -l: List junked files.
   -p: Purge all files.
    [list of files] with no other arguments to junk those files.
EOF
}

while getopts ":hlp" options; do
    case ${options} in
    h)
        flagh=1
        ;;
    l)
        flagl=1
        ;;
    p)
        flagp=1
        ;;
    ?)
        echo "Error: Unknown option '-$OPTARG'" >&2
        h_helper
        exit 1
    
    esac
done

shift "$(($OPTIND -1))"

totals=$(( flagh + flagl + flagp ))

flags=0
for file in "$@"; do
    flags=$(( flags+1 ))
done

if [[ $totals -gt 0 && $flags -eq 1 ]]; then
    echo "Error: Too many options enabled." >&2
    h_helper
    exit 1

elif [[ $totals -gt 1 ]]; then
    echo "Error: Too many options enabled." >&2
    h_helper
    exit 1
fi 

#List of junked files
if [[ $flagl -eq 1 ]]; then
    ls -lAF $Shudong
    exit 0
fi

#purged junked files
if [[ $flagp -eq 1 ]]; then
    shopt -s dotglob
    rm -rf "$Shudong"/*
    exit 0
fi

#Junk files
if [[ $flags -eq 0 ]]; then
    h_helper
    exit 0
fi
for file in "$@"; do
    if [ ! -e "$file" ]; then
        echo "Warning: '$file' not found." >&2
        exit 1
    else
        mv "$file" "$Shudong"
    fi
done



exit 0
