#include <filesystem>
#include <print>

int main(int argc, char* argv[])
{
    const std::filesystem::path exeDirectory = argv[0];

    const std::filesystem::path viewsDirectory = exeDirectory.parent_path().parent_path().parent_path() / "Server" / "views";

    if (!exists(viewsDirectory))
    {
        std::println("ViewTool: views directory {} does not exist.", viewsDirectory.string());

        return 0;
    }

    for (const auto& dirEntry : std::filesystem::recursive_directory_iterator(viewsDirectory))
    {
        if (!dirEntry.path().string().ends_with(".csp"))
        {
            continue;
        }


#ifdef WIN32
        const std::string command = std::format("cd {} & drogon_ctl create view {}",
                                                viewsDirectory.string(),
                                                dirEntry.path().filename().string());
#else
    const std::string command = std::format("cd {} && drogon_ctl create view {}", viewsDirectory.string(), dirEntry.path().filename().string());
#endif

        system(command.c_str());
    }

    return 0;
}
