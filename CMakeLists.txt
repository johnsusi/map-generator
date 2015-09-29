cmake_minimum_required(VERSION 3.1)

project(map-generator)

include_directories(${CMAKE_JS_INC})

add_library(${PROJECT_NAME} SHARED
  src/addon.cpp
)

execute_process(
  COMMAND node -p process.platform
  OUTPUT_VARIABLE NODE_PLATFORM
  OUTPUT_STRIP_TRAILING_WHITESPACE
)

set_target_properties(${PROJECT_NAME} PROPERTIES
  PREFIX ""
  SUFFIX "-v${NODE_RUNTIMEVERSION}-${NODE_PLATFORM}-${NODE_ARCH}.node"
)

target_link_libraries(${PROJECT_NAME}
  ${CMAKE_JS_LIB})
