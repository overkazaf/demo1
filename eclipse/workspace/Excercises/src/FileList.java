import java.io.File;

public class FileList {
	public static void main (String[] args) {
		File file = new File("/Users/overkazaf/Desktop");
		if (file.isDirectory()) {
			String[] list = file.list();
			for (String filename : list) {
				System.out.println(filename);
			}
		} 
	}
}
