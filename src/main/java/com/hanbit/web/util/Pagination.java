package com.hanbit.web.util;

public class Pagination {
	public static int[] getStartRow(int totCount, int pgNum, int pgSize){
		int startRow = 0, endRow =0;
		int[] rows = new int[2];
		
		if (pgNum <= totCount / pgSize + 1) {
			if (pgNum==1) {
				startRow = 1;
				endRow = pgSize;
			} else {
				startRow = (pgNum -1) * pgSize + 1;
	            endRow = pgNum * pgSize;
			}
		}
		rows[0] = startRow;
		rows[1] = endRow;
		
		return rows;
	}
}
