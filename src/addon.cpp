#include <iostream>

#include <nan.h>

NAN_METHOD(Foo) {
  std::cout << "Foo" << std::endl;
}

NAN_MODULE_INIT(Init) {
  std::cout << "Init" << std::endl;
  NAN_EXPORT(target, Foo);
}
