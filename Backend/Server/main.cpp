#include <drogon/drogon.h>

int main(int argc, char* argv[])
{
#ifdef _DEBUG
    drogon::app().loadConfigFile("bin/configDebug.json");
#else
    drogon::app().loadConfigFile("bin/config.json");
#endif
    
    drogon::app().run();
    return 0;
}
