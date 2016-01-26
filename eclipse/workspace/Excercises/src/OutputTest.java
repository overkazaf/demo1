import java.io.*;
public class OutputTest {
	public static void main (String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		
//		char c;
//		do {
//			c = (char)br.read();
//			System.out.println(c);
//		} while (c != 'q');
		String str;
		
		do {
			str = br.readLine();
			System.out.println("line -> " + str);
		} while (!str.equals("quit"));
	}
}
