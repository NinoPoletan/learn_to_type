cmake_minimum_required(VERSION 3.26)

project(ViewTool)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

file(GLOB_RECURSE _files "${CMAKE_CURRENT_SOURCE_DIR}/Source/*")

add_executable(ViewTool ${_files})
target_include_directories(ViewTool PUBLIC "${CMAKE_CURRENT_SOURCE_DIR}/Source" "${_files}")
export(TARGETS ViewTool FILE ViewToolTargets.cmake)
