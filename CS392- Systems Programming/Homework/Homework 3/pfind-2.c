#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/stat.h>
#include <dirent.h>

// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System.

// function to recursively search directory for files with matching permissions
void traverse(char *DirectoryPathHelp, char *StringPerms) {
    DIR *DirectoryHao = opendir(DirectoryPathHelp);
    struct stat CurrentStatLOL;
    struct dirent *CurrentLOL;
    // Construct the full path of the file/directory (was made size 2048 to avoid buffer overflow)
    char ZePath[2048];

    while ((CurrentLOL = readdir(DirectoryHao)) != NULL) {
        if (strcmp(CurrentLOL->d_name, ".") == 0 || strcmp(CurrentLOL->d_name, "..") == 0) {
            continue;
        }

        snprintf(ZePath, sizeof(ZePath), "%s/%s", DirectoryPathHelp, CurrentLOL->d_name);

        // Get the file/directory's permissions
        struct stat st;
        if (lstat(ZePath, &st) < 0) {
            continue;
        }

        // Check if the file/directory's permissions match the desired permissions
        if (S_ISDIR(st.st_mode)) { // Directory
            if (StringPerms[0] == 'r' && !(st.st_mode & S_IRUSR)) {
                continue;
            }
            if (StringPerms[1] == 'w' && !(st.st_mode & S_IWUSR)) {
                continue;
            }
            if (StringPerms[2] == 'x' && !(st.st_mode & S_IXUSR)) {
                continue;
            }
            printf("%s\n", ZePath);
            traverse(ZePath, StringPerms);

        } 
        else { // File
            if (StringPerms[0] == 'r' && !(st.st_mode & S_IRUSR)) {
                continue;
            }
            if (StringPerms[1] == 'w' && !(st.st_mode & S_IWUSR)) {
                continue;
            }
            if (StringPerms[2] == 'x' && !(st.st_mode & S_IXUSR)) {
                continue;
            }
            printf("%s\n", ZePath);
        }
    }

    closedir(DirectoryHao);
}

int main(int argc, char* argv[]) {
    char* PathDirectory = argv[1];
    char* StringPerms = argv[2];


    //This code segment checks if a permissions string is valid
    if (strlen(argv[2])!=9) {
        fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", argv[2]);
        exit(EXIT_FAILURE);
    }
    //Checks each individual index for a valid permission
    for (int x=0; x<9; x++) {
        if((x==0 || x==3 || x==6) && (((argv[2])[x] != 'r') && ((argv[2])[x] != '-'))){
            fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", (argv[2]));
            exit(EXIT_FAILURE);
        }
        else if((x==1 || x==4 || x==7) && (((argv[2])[x] != 'w') && ((argv[2])[x] != '-'))){
            fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", (argv[2]));
            exit(EXIT_FAILURE);
        }
        else if((x==2 || x==5 || x==8) && (((argv[2])[x] != 'x') && ((argv[2])[x] != '-'))){
            fprintf(stderr, "Error: Permissions string '%s' is invalid.\n", (argv[2]));
            exit(EXIT_FAILURE);
        }
        
    }
    traverse(argv[1], argv[2]);
    return 0;
}
