#include <iostream>

int countCycle(int n);

int main() {
    int a, b, result, max, tmp_a, tmp_b;
    while(std::cin >> a >> b) {
        if (a < b) {
            tmp_a = a;
            tmp_b = b;
        }
        else {
            tmp_a = b;
            tmp_b = a;
        }
        max = -1;
        for (int i = tmp_a; i <= tmp_b; i++) {
            result = countCycle(i);
            max = (max > result) ? max : result;
        }
        std::cout << a << ' ' << b << ' ' << max << '\n';
    }
}

int countCycle(int n) {
    int cycle = 1;
    while (n != 1) {
        n = (n % 2) ? (3 * n + 1) : (n / 2);
        cycle++;
    }
    return cycle;
}