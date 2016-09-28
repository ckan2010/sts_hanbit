package com.hanbit.web.util;

import com.hanbit.web.contants.Values;

public class Pagination {
	public static int[] getRows(int totCount, int pgNum, int pgSize){
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
	public static int[] getPages(int totCount,int pgNum){
		int[] pages = new int[3];
		int startPg=0,lastPg=0,totPg=0;
		totPg = (totCount % Values.PG_SIZE == 0)?totCount/Values.PG_SIZE:totCount/Values.PG_SIZE + 1;
		startPg = pgNum-((pgNum-1)%Values.PG_SIZE);		
		lastPg = (startPg + Values.PG_SIZE-1 <= totPg)?startPg + Values.PG_SIZE -1:totPg;
		pages[0] = startPg;
		pages[1] = lastPg;
		pages[2] = totPg;
		return pages;
	}
}
