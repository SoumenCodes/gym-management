"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  PlusCircle,
  Users,
  UserCheck,
  Wallet,
  Calendar,
  Eye,
  ArrowUpDown,
} from "lucide-react";

export default function Dashboard() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = months[new Date().getMonth()];

  const [search, setSearch] = useState("");
  const [month, setMonth] = useState(currentMonth);

  const [sortAsc, setSortAsc] = useState(true);
  const [sortKey, setSortKey] = useState("name");

  const [isAddOpen, setIsAddOpen] = useState(false);

  const [members, setMembers] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      fee: 1000,
      gender: "male",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      paidMonths: ["September"],
    },
    {
      id: 3,
      name: "Alice Johnson",
      phone: "7654321098",
      fee: 1500,
      gender: "female",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      paidMonths: ["September", "October"],
    },
    {
      id: 4,
      name: "Bob Brown",
      phone: "6543210987",
      fee: 900,
      gender: "male",
      photo: "https://randomuser.me/api/portraits/men/75.jpg",
      paidMonths: [],
    },
    {
      id: 5,
      name: "Charlie Davis",
      phone: "5432109876",
      fee: 1100,
      gender: "male",
      photo: "https://randomuser.me/api/portraits/men/15.jpg",
      paidMonths: ["October"],
    },
  ]);

  const [viewMember, setViewMember] = useState(null);

  // Filter + Sort
  const filteredMembers = members
    .filter(
      (m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.phone.includes(search)
    )
    .sort((a, b) => {
      let valA, valB;

      if (sortKey === "name") {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (sortKey === "fee") {
        valA = a.fee;
        valB = b.fee;
      } else if (sortKey === "gender") {
        valA = a.gender;
        valB = b.gender;
      } else if (sortKey === "status") {
        const paidA = a.paidMonths.includes(month) ? 1 : 0;
        const paidB = b.paidMonths.includes(month) ? 1 : 0;
        valA = paidA;
        valB = paidB;
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });

  // Dashboard calculations
  const totalMembers = members.length;
  const activeMembers = totalMembers;
  const feesPending = members.filter(
    (m) => !m.paidMonths.includes(month)
  ).length;
  const feesCollected = members
    .filter((m) => m.paidMonths.includes(month))
    .reduce((sum, m) => sum + m.fee, 0);

  // Add new member handler
  const handleAddMember = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newMember = {
      id: Date.now(),
      name: formData.get("name"),
      phone: formData.get("phone"),
      gender: formData.get("gender"),
      fee: Number(formData.get("fee")),
      photo: formData.get("photo")
        ? URL.createObjectURL(formData.get("photo"))
        : "",
      paidMonths: [],
    };
    setMembers((prev) => [...prev, newMember]);
    setIsAddOpen(false); // close popup after saving
    e.currentTarget.reset();
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-blue-900 dark:text-blue-100">
              Total Members
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {totalMembers}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-green-900 dark:text-green-100">
              Active Members
            </CardTitle>
            <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
              {activeMembers}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-red-900 dark:text-red-100">
              Fees Pending ({month})
            </CardTitle>
            <Wallet className="h-5 w-5 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-700 dark:text-red-300">
              {feesPending}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-500">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-purple-900 dark:text-purple-100">
              Fees Collected ({month})
            </CardTitle>
            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
              ₹{feesCollected}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <Input
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3"
        />

        <div className="flex flex-col md:flex-row gap-3 md:items-center md:flex-1 md:justify-end">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-full md:w-[160px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-3">
            <Select value={sortKey} onValueChange={(val) => setSortKey(val)}>
              <SelectTrigger className="w-full md:w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="fee">Fee Amount</SelectItem>
                <SelectItem value="gender">Gender</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortAsc(!sortAsc)}
              className="flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <ArrowUpDown className="h-4 w-4" />
              <span className="hidden md:inline">Sort </span>
              {sortAsc ? "Asc" : "Desc"}
            </Button>
          </div>

          {/* Add Member Dialog */}
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center justify-center gap-2 w-full md:w-auto">
                <PlusCircle className="h-4 w-4" />
                <span className="hidden md:inline">Add </span>Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Member</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddMember} className="space-y-4">
                <Input name="name" placeholder="Full Name" required />
                <Input name="phone" placeholder="Phone Number" required />
                <Select name="gender">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  name="fee"
                  placeholder="Fee Amount"
                  required
                />
                <Input type="file" name="photo" accept="image/*" />
                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Photo</TableHead>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead className="w-[150px]">Phone</TableHead>
                <TableHead className="w-[120px]">Status ({month})</TableHead>
                <TableHead className="w-[200px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((m) => {
                const hasPaid = m.paidMonths.includes(month);
                return (
                  <TableRow key={m.id}>
                    <TableCell className="w-[80px]">
                      {m.photo ? (
                        <img
                          src={m.photo || "/placeholder.svg"}
                          alt={m.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground">No Photo</span>
                      )}
                    </TableCell>
                    <TableCell className="w-[200px]">{m.name}</TableCell>
                    <TableCell className="w-[150px]">{m.phone}</TableCell>
                    <TableCell className="w-[120px]">
                      {hasPaid ? (
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700">
                          Paid
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-200 dark:border-red-700">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="w-full text-right flex gap-2 justify-end ">
                      <Button
                        variant={hasPaid ? "secondary" : "default"}
                        size="sm"
                        onClick={() =>
                          setMembers((prev) =>
                            prev.map((mem) =>
                              mem.id === m.id
                                ? {
                                    ...mem,
                                    paidMonths: hasPaid
                                      ? mem.paidMonths.filter(
                                          (pm) => pm !== month
                                        )
                                      : [...mem.paidMonths, month],
                                  }
                                : mem
                            )
                          )
                        }
                      >
                        {hasPaid ? "Mark Pending" : "Mark Paid"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewMember(m)}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View/Edit Member Dialog */}
      <Dialog open={!!viewMember} onOpenChange={() => setViewMember(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Member Profile</DialogTitle>
          </DialogHeader>
          {viewMember && (
            <div className="space-y-4">
              <img
                src={viewMember.photo || "https://via.placeholder.com/100"}
                alt={viewMember.name}
                className="h-24 w-24 rounded-full object-cover mx-auto"
              />
              <Input
                defaultValue={viewMember.name}
                onChange={(e) =>
                  setViewMember({ ...viewMember, name: e.target.value })
                }
              />
              <Input
                defaultValue={viewMember.phone}
                onChange={(e) =>
                  setViewMember({ ...viewMember, phone: e.target.value })
                }
              />
              <Input
                type="number"
                defaultValue={viewMember.fee}
                onChange={(e) =>
                  setViewMember({ ...viewMember, fee: Number(e.target.value) })
                }
              />
              <Button
                onClick={() => {
                  setMembers((prev) =>
                    prev.map((m) => (m.id === viewMember.id ? viewMember : m))
                  );
                  setViewMember(null);
                }}
                className="w-full"
              >
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
