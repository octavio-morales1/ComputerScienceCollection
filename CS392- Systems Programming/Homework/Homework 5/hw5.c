// Name: Octavio Morales
// Pledge: I pledge my honor that I have abided by the Stevens Honor System. 


#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <sys/wait.h>
#include <unistd.h>
#include <limits.h>
#include <pwd.h>

#define BUFSIZE 	 8192
#define MAX_STRLEN   255
#define BLUE "\x1b[34;1m"
#define DEFAULT "\x1b[0m"
volatile int a = 0;


void catch_signal(int sig) {
    a = sig;
}

int remAllReqChar(char* str, const char chrct) {
    int amt= strlen(str);
    int numSame = 0;

    // Count the number of occurrences of chr
    for (int x= 0; x< amt; x++) {
        if (str[x]== chrct) {
            numSame++;
        }
    } 

    // Check if the number of occurrences is even
    if (numSame % 2 != 0) {
        return 1;
    }

    // Remove all occurrences of chr
    int y=0;
    for (int x = 0; str[x] != '\0'; x++) {
        if (str[x] != chrct) {
            str[y++] = str[x];
        }
    }
    str[y] = '\0';
    return 0;
}


int doesStartWithQuestionMark(const char *str, const char *prefix) {
    size_t s= strlen(str);
    size_t p= strlen(prefix);
    if (s<p) {
        return 0;
    }
    for (int x= 0; x< p; x++) {
        if (prefix[x]!= str[x]) {
            return 0;
        }
    }
    return 1;
}

int CDcoms(size_t argAMT, char **args) {
    struct passwd *temp = getpwuid(getuid());
    if (temp== NULL) {
        fprintf(stderr, "Error: Cannot get passwd entry: %s\n", strerror(errno));
        return 1;
    }

    char *theDirectory = temp->pw_dir;
    if (argAMT > 2) {
        fprintf(stderr, "Error: Too many arguments to cd.\n");
        return 1;
    }
    
    if (argAMT == 2) {
        char *path = args[1];
        if (path[0] == '~') {
            if (path[1] == '\0') {
                // "~" argument: home directory
            } 
            else if (path[1] == '/') {
                // "~/path" argument: move to path from home directory
                theDirectory = strcat(temp->pw_dir, path + 1);
            } 
            else {
                // "~username/path" argument: use the home directory
                char *usern = &path[1];
                char *end = strchr(usern, '/');
                if (end != NULL) {
                    *end = '\0';
                }
                struct passwd *uTemp = getpwnam(usern);
                if (uTemp== NULL) {
                    fprintf(stderr, "cd: unknown user: %s\n", usern);
                    return 1;
                }
                theDirectory= uTemp->pw_dir;
                if (end != NULL) {
                    *end = '/';
                    theDirectory = strcat(theDirectory, end);
                }
            }
        } 
        else {
            // regular path argument
            theDirectory= args[1];
        }
    }
    
    if (chdir(theDirectory) != 0) {
        fprintf(stderr, "Error: Cannot change directory to '%s': %s\n", theDirectory, strerror(errno));
        return 1;
    }
    
    return 0;
}

size_t parserForShell(char **info, char *str) {
    size_t amt = 0;
    char *point = strtok(str, " \n");

    for(point; point!= NULL; point= strtok(NULL, " \n")){
        info[amt] = malloc(sizeof(char)* (strlen(point) + 1));
        if(info[amt]== NULL) {
            fprintf(stderr, "Error: malloc() failed. %s.\n", strerror(errno));
            for (size_t x=0; x< amt; x++) {
                free(info[x]);
            }
            free(info);
            return 0;
        }
        if (MAX_STRLEN< strlen(point)) {
            fprintf(stderr, "Error: Argument '%s' is exceeds STR Length\n", point);
            for (size_t x=0; x< amt; x++) {
                free(info[x]);
            }
            free(info);
            return 0;
        }
        strcpy(info[amt], point);
        amt++;
    }
    return amt;
}


int main(int argc, char *argv[]) {
	char directory[PATH_MAX];
	struct sigaction shellOverall;
    int cProcessTemp= 1;

    memset(&shellOverall, 0, sizeof(struct sigaction));
    shellOverall.sa_handler = catch_signal;
    size_t temp1= sigaction(SIGINT, &shellOverall, NULL);
    if (temp1==-1) {
        fprintf(stderr, "Error: Cannot register signal handler. %s.\n", strerror(errno));
        return EXIT_FAILURE;
    }

    //displaying everything and does commands
    int temp=0;
	while(temp==0){
		char buff[BUFSIZE];
		if (getcwd(directory, sizeof(directory)) == NULL) {
			fprintf(stderr, "Error: Cannot get current working directory. %s.\n", strerror(errno));
			return EXIT_FAILURE;
		}
		
		printf("%s[%s]%s> ", BLUE, directory, DEFAULT);
		if(fgets(buff, BUFSIZE ,stdin) == NULL) {
		
			if(a == SIGINT){
				a = 0;
				printf("\n");
            	continue;
			}
			
			fprintf(stderr, "Error: Failed to read from stdin. %s.\n", strerror(errno));
			return EXIT_FAILURE;
		}
		char *bufTEMP = strtok(buff, "\n");
		if(bufTEMP == NULL){
			continue;
		}	
		char **allInfo= (char **)malloc(1024 * sizeof(char*));
		if(allInfo== NULL) {
			fprintf(stderr, "Error: malloc() failed. %s.\n", strerror(errno));
			continue;
		}	
		size_t spot= parserForShell(allInfo, bufTEMP);
		if(spot== 0){
			continue;
		}
//--------------------------------------------------------------------
        if (doesStartWithQuestionMark(bufTEMP, argv[0])==1){
			cProcessTemp++;

		}
        else if(strcmp(allInfo[0], "cd") == 0){
			CDcoms(spot, allInfo);
		}
        
        else if(strcmp(allInfo[0], "exit") == 0){
			cProcessTemp--;
			if (cProcessTemp == 0){
				int x=0;
                while(x<spot){
                    free(allInfo[x]);
                    x++;
                }
                free(allInfo);
                break;
			}
		}	
        else if (a == SIGINT) {
            a = 0;
            printf("\n");
            int x=0;
            while(x<spot){
                free(allInfo[x]);
                x++;
            }
            free(allInfo);
            continue;

        }
        else if(!a){
        	char command[MAX_STRLEN];
        	strcpy(command, allInfo[0]);
        
        	
        	allInfo[spot] = (char *)NULL;
            pid_t pid= fork();
        	if (pid < 0) {        
        		fprintf(stderr, "Error: fork() failed. %s.\n", strerror(errno));        
        		return EXIT_FAILURE;    
        	}
        	else if (pid == 0){
                int execTemp=execvp(command, allInfo);
        		if(execTemp== -1){
            		fprintf(stderr, "Error: exec() failed. %s.\n", strerror(errno));
                    int x=0;
                    while(x<spot){
                        free(allInfo[x]);
                        x++;
                    }
    				free(allInfo);
            		break;
        		}
        	
        	}	
        	
        	int stat;
            for(pid_t waiting= waitpid(pid, &stat, 0); waiting==-1 && errno==EINTR; waiting = waitpid(pid, &stat, WUNTRACED | WCONTINUED)){
                fprintf(stderr, "Error: wait() failed. %s.\n", strerror(errno));
            }
        }
        int x=0;
        while(x<spot){
            free(allInfo[x]);
            x++;
        }	
    	free(allInfo);
    	
	}
	return EXIT_SUCCESS;
}


