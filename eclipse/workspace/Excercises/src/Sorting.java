import java.util.Arrays;
public class Sorting {
    
    //完成 main 方法
    public static void main(String[] args) {
        
        int[] scores = {89, -23, 64, 91, 119, 52, 73};
        sortScores(scores, 3);
    }
    
    public static void sortScores (int[] arr, int limit) {
        Arrays.sort(arr);
        System.out.println("考试成绩的前三名为：");
        for (int i = arr.length - 1, cnt = 0; i >= 0; i--) {
            if(arr[i] < 0 || arr[i] > 100) continue;
            System.out.println(arr[i]); cnt++;
            if (cnt == limit) break;
        }
    }    
}