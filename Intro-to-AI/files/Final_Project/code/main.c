#include <stdio.h>

char postfix[1000];
int len = 0;

void E();
void E_prime();
void term();
void T_prime();
void expo();
void expo_prime();
void factor();
void count_result();

int main() {
    // char* str = "3^2^2+5*2+3*2+1 = 98";
    // char* str = "3+5*2+3*2+1 = 20";
    // char* str = "(((3-1)^2^2+5)*2)+3*2+1 = 86";
    // char* str = "1+2+3+4+5 = 15";
    // lexical analysis
    E();

    // output the postfix expression
    printf("Postfix expression: ");
    for (int i = 0; i < len; i++) {
        printf("%c ", postfix[i]);
    }
    printf("\n");

    // output the result
    count_result();

}

void E() {
    term();
    E_prime();
}

void E_prime() {
    char c = getchar();
    if (c == '+') {
        term();
        postfix[len++] = '+';
        E_prime();
        // postfix[len++] = '+';
    } else {
        ungetc(c, stdin);
    }
}

void term() {
    expo();
    T_prime();
}

void T_prime() {
    char c = getchar();
    if (c == '*') {
        expo();
        postfix[len++] = '*';
        T_prime();
        // postfix[len++] = '*';
    } else {
        ungetc(c, stdin);
    }
}

void expo() {
    factor();
    expo_prime();
}

void expo_prime() {
    char c = getchar();
    if (c == '^') {
        factor();
        // postfix[len++] = '^';
        expo_prime();
        postfix[len++] = '^';
    } else {
        ungetc(c, stdin);
    }
}

void factor() {
    char c = getchar();
    if (c == '(') {
        E();
        c = getchar();
        if (c != ')') {
            printf("Error: Expected ')'\n");
        }
    } else if (c >= '0' && c <= '9') {
        postfix[len++] = c;
    } else {
        printf("Error: Invalid character\n");
    }
}

void count_result() {

    // FILE* ct_result_file = freopen("counting_result.txt", "w", stdout);

    char c;
    int arr[100], i = 0;
    for (int j = 0; j < len; j++) {
        char c = postfix[j];
        if (c == '\n') break;
        if (c == '+') {
            arr[i - 2] += arr[i - 1];
            i--;
        } else if (c == '*') {
            arr[i - 2] *= arr[i - 1];
            i--;
        } else if (c == '^') {
            int base = arr[i - 2];
            int exp = arr[i - 1];
            int result = 1;
            for (int j = 0; j < exp; j++) {
                result *= base;
            }
            arr[i - 2] = result;
            i--;
        } else if (c >= '0' && c <= '9') {
            arr[i++] = c - '0';
        }
        printf("input = %c, ", c);
        for (int j = 0; j < i; j++) {
            printf("%d ", arr[j]);
        }
        printf("\n");
    }

    printf("Result: %d\n", arr[0]);

    // fclose(ct_result_file);
}