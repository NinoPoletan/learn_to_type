cmake_minimum_required(VERSION 3.22)
project(Backend)

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

include(${CMAKE_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup()

add_subdirectory(ViewTool)

file(GLOB_RECURSE SOURCES RELATIVE ${CMAKE_SOURCE_DIR} "Server/*")

FILE(GLOB CSP_LIST ${CMAKE_SOURCE_DIR}/Server/views/*.csp)

foreach(cspFile ${CSP_LIST})
    get_filename_component(classname ${cspFile} NAME_WE)

    add_custom_command(
        OUTPUT ${CMAKE_SOURCE_DIR}/Server/views/${classname}.h ${CMAKE_SOURCE_DIR}/Server/views/${classname}.cc
        COMMAND drogon_ctl
        ARGS create view ${cspFile}
        DEPENDS ${cspFile}
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}/Server/views
        VERBATIM
    )

    set(VIEWSRC ${VIEWSRC} ${CMAKE_SOURCE_DIR}/Server/views/${classname}.cc)
endforeach()

add_executable(Server ${SOURCES} ${VIEWSRC})
target_link_libraries(Server ${CONAN_LIBS})

add_dependencies(Server ViewTool)

set(SOURCE_DIR ${CMAKE_CURRENT_SOURCE_DIR})
set(BUILD_DIR ${CMAKE_CURRENT_BINARY_DIR})

# run ViewTool
add_custom_command(
    TARGET Server
    COMMAND $<TARGET_FILE:ViewTool> ${CMAKE_SOURCE_DIR}/Server/views
    COMMENT "Running ViewTool..."
)

add_custom_command(
    TARGET Server POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${SOURCE_DIR}/Server/views ${BUILD_DIR}/bin/views
    COMMAND ${CMAKE_COMMAND} -E copy_directory ${SOURCE_DIR}/Server/static ${BUILD_DIR}/bin/static
    COMMAND ${CMAKE_COMMAND} -E copy ${SOURCE_DIR}/Server/config.json ${BUILD_DIR}/bin
    COMMAND ${CMAKE_COMMAND} -E copy ${SOURCE_DIR}/Server/configDebug.json ${BUILD_DIR}/bin
    DEPENDS ${SOURCE_DIR}/Server/views ${SOURCE_DIR}/Server/static ${SOURCE_DIR}/Server/config.json
    DEPENDS ${SOURCE_DIR}/Server/views ${SOURCE_DIR}/Server/static ${SOURCE_DIR}/Server/configDebug.json
)

add_custom_target(run
    COMMAND ${CMAKE_CURRENT_BINARY_DIR}/Server
    DEPENDS Server
    COMMENT "Running Server..."
)
