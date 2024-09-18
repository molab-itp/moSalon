#!/bin/bash
cd ${0%/*}

# clone moWebJam

cd ..

# moLib
# check for destination moLib
dest=moLib
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
  pushd $dest > /dev/null
  git checkout next
  popd > /dev/null
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

# check for destination p5moRelease
# dest=p5moRelease
# if [ ! -e "$dest" ]; then
#   git clone https://github.com/molab-itp/$dest.git $dest
# fi
# if [ ! -e "$dest" ]; then
#   echo "fail to clone to $dest"
#   exit
# fi

# check for destination moWebJam
dest=moWebJam
if [ ! -e "$dest" ]; then
  git clone https://github.com/molab-itp/$dest.git $dest
fi
if [ ! -e "$dest" ]; then
  echo "fail to clone to $dest"
  exit
fi

# Begin in next branch
git checkout next
