#!/bin/bash
cd ${0%/*}

# clone moWebJam

cd ..

# moLib
# check for destination moLib
dest=moLib
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

# moRelease
# check for destination moRelease
dest=moRelease
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

# moWebJam
# check for destination moWebJam
dest=moWebJam
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

