
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface XProtectLog {
  id: string;
  timestamp: Date;
  threat: string;
  file: string;
  action: 'blocked' | 'quarantined' | 'cleaned';
  severity: 'low' | 'medium' | 'high';
  details: string;
}

interface XProtectLogsProps {
  logs: XProtectLog[];
}

const XProtectLogs: React.FC<XProtectLogsProps> = ({ logs }) => {
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredLogs = logs.filter(log => {
    const actionMatch = filterAction === 'all' || log.action === filterAction;
    const severityMatch = filterSeverity === 'all' || log.severity === filterSeverity;
    return actionMatch && severityMatch;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getActionBadge = (action: string) => {
    const variants = {
      'blocked': 'destructive',
      'quarantined': 'secondary',
      'cleaned': 'default'
    } as const;
    
    return (
      <Badge variant={variants[action as keyof typeof variants] || 'default'}>
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </Badge>
    );
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[severity as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            XProtect Security Logs
            <div className="flex gap-2">
              <Button
                variant={filterAction === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterAction('all')}
              >
                All Actions
              </Button>
              <Button
                variant={filterAction === 'blocked' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterAction('blocked')}
              >
                Blocked
              </Button>
              <Button
                variant={filterAction === 'quarantined' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterAction('quarantined')}
              >
                Quarantined
              </Button>
              <Button
                variant={filterAction === 'cleaned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterAction('cleaned')}
              >
                Cleaned
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Button
              variant={filterSeverity === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('all')}
            >
              All Severities
            </Button>
            <Button
              variant={filterSeverity === 'high' ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('high')}
            >
              High
            </Button>
            <Button
              variant={filterSeverity === 'medium' ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('medium')}
            >
              Medium
            </Button>
            <Button
              variant={filterSeverity === 'low' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterSeverity('low')}
            >
              Low
            </Button>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No XProtect logs found matching your filters
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Threat</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {formatDate(log.timestamp)}
                    </TableCell>
                    <TableCell className="font-medium">{log.threat}</TableCell>
                    <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                      {log.file}
                    </TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell>{getSeverityBadge(log.severity)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {log.details}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default XProtectLogs;
