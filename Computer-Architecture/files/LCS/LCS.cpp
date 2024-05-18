
#include <iostream>
using namespace std;
// Refernce : https://www.geeksforgeeks.org/longest-common-subarray-in-the-given-two-arrays/

//==============testcase1==============
int A[] = {1, 2, 3, 2, 1};
int i = 5;
int B[] = {8, 7, 6, 4, 7};
int j = 5;
//output: 0
//=====================================

//==============testcase2==============
//int A[] = {1, 2, 8, 2, 1};
//int i = 5;
//int B[] = {8, 2, 1, 4, 7};
//int j = 5;
//output: 3
//=====================================

//=========testcase3===========
//int A[] = {1, 2, 3, 4, 6};
//int i = 5;
//int B[] = {0, 1, 3, 4, 3, 5, 6, 8};
//int j = 8;
//output: 2
//==============================

// Recursive function to find the longest common subarray (LCS)
int LCS(int i, int j, int A[], int B[], int count) {
	// Base case: If either of the indices reaches the end of the array, return the count
	if (i == 0 || j == 0) {
        return count;
    }

	// If the current elements are equal, recursively check the next elements
	if (A[i-1] == B[j-1]) {
        count = LCS(i - 1, j - 1, A, B, count + 1);
    }
	// Recursively check for the longest common subarray by considering two possibilities:
	// 1. Exclude current element from array A and continue with array B
	// 2. Exclude current element from array B and continue with array A
	else {
        int a = LCS(i - 1, j, A, B, 0);
        int b = LCS(i, j - 1, A, B, 0);
        if (a < b) {
            a = b;
        }
        if (count < a) {
            count = a;
        }
    }
    
	
	return count;
}

int main() {
	
	// Call the LCS function to find the maximum length of the common subarray
	int maxLength = LCS(i, j, A, B, 0);
	
	// Print the result
	cout << "length of common subarray: " << maxLength << endl;

	return 0;
}
