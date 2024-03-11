#! /usr/bin/env sh

# 构建
pnpm run docs:build

# 进入待发布目录
cd docs/.vitepress/dist

git remote add vue-weui https://github.com/mxchensir/vue-weui.git
git add -A
git commmit -m 'deploy'

git push -f vue-weui master